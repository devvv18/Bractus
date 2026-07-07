'use client'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const BADGES = [
  'Website & Applications',
  'AI & Machine Learning',
  'Full-Stack Engineering',
  'System Architecture',
  'Cloud & DevOps',
  'Data Engineering',
]

// 1D Value Noise class for cursor drift (value noise)
class ValueNoise1D {
  constructor() {
    this.MAX_VERTICES = 256;
    this.MAX_VERTICES_MASK = this.MAX_VERTICES - 1;
    this.amplitude = 1;
    this.scale = 1;
    this.r = [];
    for (let e = 0; e < this.MAX_VERTICES; ++e) {
      this.r.push(Math.random());
    }
  }
  getVal(e) {
    const t = e * this.scale;
    const i = Math.floor(t);
    const r = t - i;
    const o = r * r * (3 - 2 * r);
    const s = i % this.MAX_VERTICES_MASK;
    const a = (s + 1) % this.MAX_VERTICES_MASK;
    const l = this.lerp(this.r[s], this.r[a], o);
    return l * this.amplitude;
  }
  lerp(e, t, i) {
    return e * (1 - i) + t * i;
  }
}

// O(N) Poisson-Disk Sampler to generate organic grid spacing
function poissonDiskSample(width, height, minDistance, maxDistance, tries) {
  const cellSize = minDistance / Math.sqrt(2);
  const gridWidth = Math.ceil(width / cellSize);
  const gridHeight = Math.ceil(height / cellSize);
  const grid = new Int32Array(gridWidth * gridHeight);
  const samplePoints = [];
  const activeList = [];

  function isValid(p) {
    if (p[0] < 0 || p[0] >= width || p[1] < 0 || p[1] >= height) return false;
    const cellX = Math.floor(p[0] / cellSize);
    const cellY = Math.floor(p[1] / cellSize);
    const minX = Math.max(0, cellX - 2);
    const maxX = Math.min(gridWidth - 1, cellX + 2);
    const minY = Math.max(0, cellY - 2);
    const maxY = Math.min(gridHeight - 1, cellY + 2);

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const index = grid[y * gridWidth + x] - 1;
        if (index >= 0) {
          const other = samplePoints[index];
          const dx = p[0] - other[0];
          const dy = p[1] - other[1];
          if (dx * dx + dy * dy < minDistance * minDistance) {
            return false;
          }
        }
      }
    }
    return true;
  }

  function addPoint(p) {
    samplePoints.push(p);
    activeList.push(p);
    const cellX = Math.floor(p[0] / cellSize);
    const cellY = Math.floor(p[1] / cellSize);
    grid[cellY * gridWidth + cellX] = samplePoints.length;
  }

  // Start with a random point
  addPoint([Math.random() * width, Math.random() * height]);

  while (activeList.length > 0) {
    const activeIndex = Math.floor(Math.random() * activeList.length);
    const p = activeList[activeIndex];
    let found = false;

    for (let i = 0; i < tries; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = minDistance + Math.random() * (maxDistance - minDistance);
      const candidate = [
        p[0] + radius * Math.cos(theta),
        p[1] + radius * Math.sin(theta)
      ];

      if (isValid(candidate)) {
        addPoint(candidate);
        found = true;
        break;
      }
    }

    if (!found) {
      activeList.splice(activeIndex, 1);
    }
  }
  return samplePoints;
}

// GLSL Simplex Noise library for GPU simulation & rendering
const SIMPLEX_NOISE_GLSL = `
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  float permute(float x){return floor(mod(((x*34.0)+1.0)*x, 289.0));}

  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float taylorInvSqrt(float r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
            -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }
`;

// GPGPU Simulation Fragment Shader
const SIMULATION_FRAGMENT_SHADER = `
precision highp float;
uniform sampler2D uPosition;
uniform sampler2D uPosRefs;
uniform vec2 uRingPos;
uniform float uTime;
uniform float uDeltaTime;
uniform float uRingRadius;

uniform float uRingWidth;
uniform float uRingWidth2;
uniform float uRingDisplacement;

${SIMPLEX_NOISE_GLSL}

void main() {
    vec2 simTexCoords = gl_FragCoord.xy / vec2(256.0, 256.0);
    vec4 pFrame = texture2D(uPosition, simTexCoords);

    float scale = pFrame.z;
    float velocity = pFrame.w;
    vec2 refPos = texture2D(uPosRefs, simTexCoords).xy;

    float time = uTime * .5;
    vec2 curentPos = refPos;

    vec2 pos = pFrame.xy;
    pos *= .8;

    float dist = distance(curentPos.xy, uRingPos);
    float noise0 = snoise(vec3(curentPos.xy * .2 + vec2(18.4924, 72.9744), time * 0.5));
    float dist1 = distance(curentPos.xy + (noise0 * .005), uRingPos);

    float t = smoothstep(uRingRadius - (uRingWidth * 2.), uRingRadius, dist) - smoothstep(uRingRadius, uRingRadius + uRingWidth, dist1);
    float t2 = smoothstep(uRingRadius - (uRingWidth2 * 2.), uRingRadius, dist) - smoothstep(uRingRadius, uRingRadius + uRingWidth2, dist1);
    float t3 = smoothstep(uRingRadius + uRingWidth2, uRingRadius, dist);

    t = pow(t, 2.);
    t2 = pow(t2, 3.);

    t += t2 * 3.;
    t += t3 * .4;
    t += snoise(vec3(curentPos.xy * 30. + vec2(11.4924, 12.9744), time * 0.5)) * t3 * .5;

    float nS = snoise(vec3(curentPos.xy * 2. + vec2(18.4924, 72.9744), time * 0.5));
    t += pow((nS + 1.5) * .5, 2.) * .6;

    // Mid scale noise
    float noise1 = snoise(vec3(curentPos.xy * 4. + vec2(88.494, 32.4397), time * 0.35));
    float noise2 = snoise(vec3(curentPos.xy * 4. + vec2(50.904, 120.947), time * 0.35));

    // Close scale noise
    float noise3 = snoise(vec3(curentPos.xy * 20. + vec2(18.4924, 72.9744), time * .5));
    float noise4 = snoise(vec3(curentPos.xy * 20. + vec2(50.904, 120.947), time * .5));

    vec2 disp = vec2(noise1, noise2) * .03;
    disp += vec2(noise3, noise4) * .005;

    // Sin waves
    disp.x += sin((refPos.x * 20.) + (time * 4.)) * .02 * clamp(dist, 0., 1.);
    disp.y += cos((refPos.y * 20.) + (time * 3.)) * .02 * clamp(dist, 0., 1.);

    pos -= (uRingPos - (curentPos + disp)) * pow(t2, .75) * uRingDisplacement;

    // Add scale
    float scaleDiff = t - scale;
    scaleDiff *= .2;
    scale += scaleDiff;

    // Final position
    vec2 finalPos = curentPos + disp + (pos * .25);

    velocity *= .5;
    velocity += scale * .25;

    gl_FragColor = vec4(finalPos, scale, velocity);
}
`;

// Render Vertex Shader
const RENDER_VERTEX_SHADER = `
precision highp float;
attribute vec4 seeds;

uniform sampler2D uPosition;
uniform float uTime;
uniform float uParticleScale;
uniform float uPixelRatio;
uniform int uColorScheme;

varying vec4 vSeeds;
varying float vVelocity;
varying vec2 vLocalPos;
varying vec2 vScreenPos;
varying float vScale;

void main() {
    vec4 pos = texture2D(uPosition, uv);
    vSeeds = seeds;

    vVelocity = pos.w;
    vScale = pos.z;
    vLocalPos = pos.xy;
    vec4 viewSpace  = modelViewMatrix * vec4(vec3(pos.xy, 0.), 1.0);

    gl_Position = projectionMatrix * viewSpace;
    vScreenPos = gl_Position.xy;

    gl_PointSize = ((vScale * 10.0) * (uPixelRatio * 0.5) * uParticleScale);
}
`;

// Render Fragment Shader
const RENDER_FRAGMENT_SHADER = `
precision highp float;

varying vec4 vSeeds;
varying vec2 vScreenPos;
varying vec2 vLocalPos;
varying float vScale;
varying float vVelocity;

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

uniform vec2 uRingPos;
uniform vec2 uRez;

uniform float uAlpha;
uniform float uTime;

uniform int uColorScheme;

${SIMPLEX_NOISE_GLSL}

float sdRoundBox( in vec2 p, in vec2 b, in vec4 r )
{
    r.xy = (p.x>0.0)?r.xy : r.zw;
    r.x  = (p.y>0.0)?r.x  : r.y;
    vec2 q = abs(p)-b+r.x;
    return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
}

vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, s, -s, c);
    return m * v;
}

void main() {
    float uBorderSize = 0.2;
    float ratio = uRez.x / uRez.y;

    // Noise
    float noiseAngle = snoise(vec3(vLocalPos * 10. + vec2(18.4924, 72.9744), uTime * .85));
    float noiseColor = snoise(vec3(vLocalPos * 2. + vec2(74.664, 91.556), uTime * .5));
    noiseColor = (noiseColor + 1.) * .5;

    // get angle between capsule and ring
    float angle = atan(vLocalPos.y - uRingPos.y, vLocalPos.x - uRingPos.x);

    vec2 uv = gl_PointCoord.xy;
    uv -= vec2(0.5);
    uv.y *= -1.;
    uv = rotate(uv, -angle + (noiseAngle * .5));

    float h = 0.8; // position of middleColor
    float progress = smoothstep(0., .75, pow(noiseColor, 2.));
    vec3 col = mix(mix(uColor1, uColor2, progress/h), mix(uColor2, uColor3, (progress - h)/(1.0 - h)), step(h, progress));
    vec3 color = col;

    float rounded = sdRoundBox(uv, vec2(0.5, 0.2), vec4(.25));
    rounded = smoothstep(.1, 0., rounded);

    float a = uAlpha * rounded * smoothstep(0.1, 0.2, vScale);

    if(a < 0.01){
        discard;
    }

    color = clamp(color, 0., 1.);
    color = mix(color, color * clamp(vVelocity, 0., 1.), float(uColorScheme));

    gl_FragColor = vec4(color, clamp(a, 0., 1.));
}
`;

const getThemeColors = (isDark) => {
  if (isDark) {
    return {
      c1: '#078462', // Vibrant brand green
      c2: '#93c5fd', // Light blue accent
      c3: '#1e40af'  // Deep royal blue
    };
  } else {
    return {
      c1: '#013F4A', // Deep teal
      c2: '#078462', // Vibrant brand green
      c3: '#93c5fd'  // Light blue accent
    };
  }
};

function ParticleGrid() {
  const canvasRef = useRef(null)
  const [hasWebGL, setHasWebGL] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const pixelRatio = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;

    // 1. Initialize WebGL Renderer with graceful fallbacks for Safari/mobile devices
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
        stencil: false,
        precision: "highp"
      });

      const gl = renderer.getContext();
      if (!gl) throw new Error("Could not get WebGL context");
      const isWebGL2 = gl instanceof WebGL2RenderingContext;
      if (!isWebGL2) {
        const floatExt = gl.getExtension('OES_texture_float');
        if (!floatExt) throw new Error("Float textures not supported");
      }
    } catch (e) {
      console.warn("WebGL or Float Texture support missing, falling back to CSS grid:", e);
      setHasWebGL(false);
      return;
    }

    renderer.setPixelRatio(pixelRatio);
    
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height, false);
    renderer.autoClear = false;

    // 2. Initialize Main Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = 3.1;

    // 3. Initialize Raycast Plane for mouse tracking
    const raycastPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(12.5, 12.5),
      new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide })
    );
    scene.add(raycastPlane);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    const intersectionPoint = new THREE.Vector3(0, 0, 0);
    let isIntersecting = false;
    let mouseIsOver = false;

    // 4. Generate Poisson-Disk organic grid
    const points = poissonDiskSample(500, 500, 4.66, 5.66, 20);
    const pointsData = [];
    for (let i = 0; i < points.length; i++) {
      pointsData.push(points[i][0] - 250, points[i][1] - 250);
    }
    const count = points.length;
    const size = 256;
    const length = size * size;

    // 5. Create Data Texture for GPGPU initialization
    const posData = new Float32Array(length * 4);
    for (let i = 0; i < count; i++) {
      const idx = i * 4;
      posData[idx + 0] = pointsData[i * 2 + 0] * (1 / 250);
      posData[idx + 1] = pointsData[i * 2 + 1] * (1 / 250);
      posData[idx + 2] = 0; // Scale
      posData[idx + 3] = 0; // Velocity
    }
    const posTex = new THREE.DataTexture(posData, size, size, THREE.RGBAFormat, THREE.FloatType);
    posTex.needsUpdate = true;

    // 6. Create double-buffered GPGPU render targets
    const createRenderTarget = () => {
      return new THREE.WebGLRenderTarget(size, size, {
        wrapS: THREE.ClampToEdgeWrapping,
        wrapT: THREE.ClampToEdgeWrapping,
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
        depthBuffer: false,
        stencilBuffer: false
      });
    };
    let rt1 = createRenderTarget();
    let rt2 = createRenderTarget();

    // Clear targets
    renderer.setRenderTarget(rt1);
    renderer.setClearColor(0, 0);
    renderer.clear();
    renderer.setRenderTarget(rt2);
    renderer.setClearColor(0, 0);
    renderer.clear();
    renderer.setRenderTarget(null);

    // 7. Initialize GPGPU Simulation Scene & Orthographic Camera
    const simScene = new THREE.Scene();
    const simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPosition: { value: posTex },
        uPosRefs: { value: posTex },
        uRingPos: { value: new THREE.Vector2(0, 0) },
        uRingRadius: { value: 0.2 },
        uDeltaTime: { value: 0 },
        uRingWidth: { value: 0.107 },
        uRingWidth2: { value: 0.05 },
        uRingDisplacement: { value: 0.15 },
        uTime: { value: 0 }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: SIMULATION_FRAGMENT_SHADER
    });
    const simMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMaterial);
    simScene.add(simMesh);

    // 8. Initialize Main Particle Mesh
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3); // Zeros, vertex shader will place
    const uvs = new Float32Array(count * 2);
    const seeds = new Float32Array(count * 4);

    for (let s = 0; s < count; s++) {
      const a = s % size;
      const l = Math.floor(s / size);
      uvs[s * 2] = a / size;
      uvs[s * 2 + 1] = l / size;

      seeds[s * 4 + 0] = Math.random();
      seeds[s * 4 + 1] = Math.random();
      seeds[s * 4 + 2] = Math.random();
      seeds[s * 4 + 3] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geometry.setAttribute('seeds', new THREE.BufferAttribute(seeds, 4));

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const themeColors = getThemeColors(isDark);

    const renderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPosition: { value: posTex },
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(themeColors.c1) },
        uColor2: { value: new THREE.Color(themeColors.c2) },
        uColor3: { value: new THREE.Color(themeColors.c3) },
        uAlpha: { value: 1.0 },
        uRingPos: { value: new THREE.Vector2(0, 0) },
        uRez: { value: new THREE.Vector2(width, height) },
        uParticleScale: { value: 1.0 },
        uPixelRatio: { value: pixelRatio },
        uColorScheme: { value: isDark ? 0 : 1 }
      },
      vertexShader: RENDER_VERTEX_SHADER,
      fragmentShader: RENDER_FRAGMENT_SHADER,
      transparent: true,
      depthTest: false,
      depthWrite: false
    });

    const particleMesh = new THREE.Points(geometry, renderMaterial);
    particleMesh.position.set(0, 0, 0);
    particleMesh.scale.set(5, 5, 5);
    scene.add(particleMesh);

    // 9. Simulation variables (cursor and drift value noise)
    const noise = new ValueNoise1D();
    const ringPos = new THREE.Vector2(0, 0);
    const cursorPos = new THREE.Vector2(0, 0);

    // 10. Resizing handler
    const setSize = () => {
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderMaterial.uniforms.uRez.value.set(w, h);
    };

    // 11. Event Handlers for cursor tracking
    const handleInteraction = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      mouseIsOver = true;
    };
    const handleMouseMove = (e) => handleInteraction(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches[0]) handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleMouseLeave = () => {
      mouseIsOver = false;
    };

    window.addEventListener('resize', setSize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // 12. MutationObserver for Theme changes
    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const dark = document.documentElement.getAttribute('data-theme') === 'dark';
          const newColors = getThemeColors(dark);
          renderMaterial.uniforms.uColor1.value.set(newColors.c1);
          renderMaterial.uniforms.uColor2.value.set(newColors.c2);
          renderMaterial.uniforms.uColor3.value.set(newColors.c3);
          renderMaterial.uniforms.uColorScheme.value = dark ? 0 : 1;
        }
      });
    });
    themeObserver.observe(document.documentElement, { attributes: true });

    setSize();

    // 13. Render Loop with Viewport Visibility Observer (prevents CPU/GPU lag when scrolled out of view)
    let lastTime = 0;
    let clockTime = 0;
    let everRendered = false;
    let animationFrameId;
    let isInView = true;

    const render = (now) => {
      if (!isInView) return; // Pause frame execution & stop scheduling if out of view

      now *= 0.001; // convert to seconds
      let dt = now - lastTime;
      if (dt > 0.1) dt = 0.1; // Cap dt during lag spikes
      lastTime = now;
      clockTime += dt;

      // Cast ray to find cursor in 3D scene space
      if (mouseIsOver) {
        raycaster.setFromCamera(mouse, camera);
        const intersections = raycaster.intersectObject(raycastPlane);
        if (intersections.length > 0) {
          intersectionPoint.copy(intersections[0].point);
          isIntersecting = true;
        } else {
          isIntersecting = false;
        }
      } else {
        isIntersecting = false;
      }

      // Compute cursor drift using 1D Value Noise
      const driftX = (noise.getVal(clockTime * 0.66 + 94.234) - 0.5) * 2;
      const driftY = (noise.getVal(clockTime * 0.75 + 21.028) - 0.5) * 2;

      if (isIntersecting) {
        cursorPos.set(
          intersectionPoint.x * 0.175 + driftX * 0.1,
          intersectionPoint.y * 0.175 + driftY * 0.1
        );
        ringPos.set(
          ringPos.x + (cursorPos.x - ringPos.x) * 0.02,
          ringPos.y + (cursorPos.y - ringPos.y) * 0.02
        );
      } else {
        cursorPos.set(driftX * 0.2, driftY * 0.1);
        ringPos.set(
          ringPos.x + (cursorPos.x - ringPos.x) * 0.01,
          ringPos.y + (cursorPos.y - ringPos.y) * 0.01
        );
      }

      const particleScale = (canvas.clientWidth / pixelRatio / 2000) * 0.75;

      // Simulation GPGPU Ping-Pong Pass
      simMaterial.uniforms.uPosition.value = everRendered ? rt1.texture : posTex;
      simMaterial.uniforms.uTime.value = clockTime;
      simMaterial.uniforms.uDeltaTime.value = dt;
      simMaterial.uniforms.uRingRadius.value = 0.175 + Math.sin(clockTime * 1.0) * 0.03 + Math.cos(clockTime * 3.0) * 0.02;
      simMaterial.uniforms.uRingPos.value = ringPos;

      renderer.setRenderTarget(rt2);
      renderer.render(simScene, simCamera);
      renderer.setRenderTarget(null);

      // Rendering Pass
      renderMaterial.uniforms.uPosition.value = everRendered ? rt2.texture : posTex;
      renderMaterial.uniforms.uTime.value = clockTime;
      renderMaterial.uniforms.uRingPos.value = ringPos;
      renderMaterial.uniforms.uParticleScale.value = particleScale;

      renderer.clear();
      renderer.render(scene, camera);

      // Swap double buffers
      const temp = rt1;
      rt1 = rt2;
      rt2 = temp;
      everRendered = true;

      animationFrameId = requestAnimationFrame(render);
    };

    const io = new IntersectionObserver(([entry]) => {
      const wasInView = isInView;
      isInView = entry.isIntersecting;
      if (isInView && !wasInView) {
        lastTime = performance.now() * 0.001;
        animationFrameId = requestAnimationFrame(render);
      }
    }, { threshold: 0 });
    io.observe(canvas);

    animationFrameId = requestAnimationFrame((now) => {
      lastTime = now * 0.001;
      render(now);
    });

    // 14. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      io.disconnect();
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      themeObserver.disconnect();

      geometry.dispose();
      renderMaterial.dispose();
      simMaterial.dispose();
      simMesh.geometry.dispose();
      simMesh.material.dispose();
      raycastPlane.geometry.dispose();
      raycastPlane.material.dispose();
      rt1.dispose();
      rt2.dispose();
      posTex.dispose();
      renderer.dispose();
    };
  }, [])

  if (!hasWebGL) {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          background: 'radial-gradient(circle at 30% 30%, var(--accent-glow) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(7, 132, 98, 0.12) 0%, transparent 50%)',
          opacity: 0.8,
        }}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 1,
      }}
    />
  )
}


export default function Hero() {
  const contactEmail = process?.env?.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@bractus.com';
  const statsRef = useRef(null)
  const [counts, setCounts] = useState({ c0: 0, c1: 0, c2: 0, c3: 0 })
  const animated = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const STATS = [
    { end: 120, suffix: '+', label: 'Clients Served' },
    { end: 50, suffix: '+', label: 'Projects Delivered' },
    { end: 98, suffix: '%', label: 'Satisfaction Rate' },
    { end: 8, suffix: '+', label: 'Years Experience' },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true
        STATS.forEach(({ end }, i) => {
          let start = 0
          const duration = 1500
          const frameDuration = 1000 / 60
          const totalFrames = Math.round(duration / frameDuration)
          const step = end / totalFrames
          
          let currentFrame = 0
          const timer = setInterval(() => {
            currentFrame++
            start = Math.min(end, Math.ceil(step * currentFrame))
            setCounts(prev => ({ ...prev, [`c${i}`]: start }))
            if (currentFrame >= totalFrames) clearInterval(timer)
          }, frameDuration)
        })
      }
    }, { threshold: 0.15 }) // lower threshold for reliable trigger on mobile scroll

    // Delay observing by 200ms to allow the mobile layout and canvas rendering to settle
    const timer = setTimeout(() => {
      if (statsRef.current) observer.observe(statsRef.current)
    }, 200)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      background: 'var(--bg)',
      overflow: 'hidden',
    }}>
      <ParticleGrid />

      <div style={{
        position: 'absolute',
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        filter: 'blur(80px)',
      }} />

      <div className="container" style={{ 
        position: 'relative', 
        zIndex: 1, 
        paddingTop: isMobile ? 40 : 72,
        paddingBottom: isMobile ? 40 : 0
      }}>

        {/* Tags — centered across full width, above the two columns */}
        <div className="anim-fade-up" style={{
          display: 'flex',
          gap: isMobile ? 10 : 20,
          flexWrap: 'wrap', // Mobile-friendly wrap
          justifyContent: 'center',
          marginBottom: isMobile ? 30 : 40
        }}>
          <span className="tag" style={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }}>✦ COMPREHENSIVE IT SOLUTIONS</span>
          <span className="tag" style={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }}>✦ END-TO-END TECHNOLOGY PARTNER</span>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 850,
          margin: '0 auto',
          gap: isMobile ? 30 : 40,
        }}>
          {/* Content Column (Centered) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <h1 className="anim-fade-up" style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: 24,
            }}>
              We Build, Scale, and Modernize<br />
              <span className="accent-text">Complex Software Systems</span>
            </h1>

            <p className="anim-fade-up anim-delay-2" style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: 750,
              marginBottom: 32,
            }}>
              Your all-in-one partner for digital transformation. Whether building
              standard web applications to advanced DevOps, data pipelines, or reshaping
              an outdated legacy system and architecting a cutting-edge AI platform from
              the ground up, our cross-functional teams deliver scalable, high-performance
              results.
            </p>

            <div className="anim-fade-up anim-delay-3" style={{
              display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40,
              justifyContent: 'center',
            }}>
              {BADGES.map(b => (
                <span key={b} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '6px 16px', borderRadius: 100,
                  border: '1px solid var(--border)',
                  fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 400,
                }}>
                  <span style={{ color: 'var(--accent)', fontSize: 14 }}>✓</span>
                  {b}
                </span>
              ))}
            </div>

            <div className="anim-fade-up anim-delay-4" style={{ 
              display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32,
              justifyContent: 'center',
            }}>
              <a href={`mailto:${contactEmail}?subject=Schedule%20a%20Call%20with%20Bractus&body=Hello%20Bractus%20Team%2C%0A%0AI%20would%20like%20to%20schedule%20a%20call%20to%20discuss%20how%20your%20technology%20services%20can%20help%20my%20organization.%0A%0ALooking%20forward%20to%20hearing%20from%20you%21`} className="btn-primary">Schedule a call</a>
              <a href="/services" className="btn-outline">View Our Services</a>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 65, marginBottom: 40 }}>
          <div ref={statsRef} className="anim-fade-up anim-delay-4" style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? '24px 16px' : 'clamp(32px, 6vw, 64px)',
            justifyContent: 'center',
            padding: isMobile ? '24px 16px' : '28px 48px',
            borderRadius: 20,
            background: 'var(--stats-bg)',
            boxShadow: 'var(--stats-shadow)',
            width: '100%', maxWidth: 850,
          }}>
            {STATS.map(({ suffix, label }, i) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                  fontWeight: 800, color: 'var(--stats-text)',
                }}>{counts[`c${i}`]}{suffix}</div>
                <div style={{
                  fontSize: '0.7rem', color: 'rgba(255,255,255,0.85)',
                  textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: 4,
                  fontWeight: 600
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -15px); }
        }
        @keyframes lightTravel {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes slowZoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </section>
  )
}