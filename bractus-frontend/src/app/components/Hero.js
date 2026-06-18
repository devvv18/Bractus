'use client'
import { useEffect, useRef, useState } from 'react'

const BADGES = [
  'Website & Applications',
  'AI & Machine Learning',
  'Full-Stack Engineering',
  'System Architecture',
  'Cloud & DevOps',
  'Data Engineering',
]

function ParticleGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    let width = window.innerWidth
    let autoTime = 0
    let height = window.innerHeight

    const setSize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width
      canvas.height = height
      initParticles()
    }

    let mouse = { x: 0, y: 0 }
    let mouseAbs = { x: -1000, y: -1000 }
    let prevMouseAbs = { x: -1000, y: -1000 }
    let mouseVelocity = { x: 0, y: 0 }
    let smoothVelocity = { x: 0, y: 0 }
    let targetRotation = { x: 0, y: 0 }
    let currentRotation = { x: 0, y: 0 }
    let targetCx = -1
    let targetCy = -1
    let currentCx = -1
    let currentCy = -1
    let prevCx = -1
    let prevCy = -1
    // Smoothed sphere-center velocity for squash-and-stretch
    let sphereVelX = 0
    let sphereVelY = 0
    let mouseActive = false
    let globalOpacity = 0.6
    let currentScatter = 0.0
    let hasInteracted = false

    // ── Trail history buffer for magic wand wake ──────────────────────
    const TRAIL_LENGTH = 14
    let trailHistory = []   // Array of { x, y, age } — last N cursor positions

    const handleInteraction = (clientX, clientY) => {
      hasInteracted = true
      mouseActive = true
      const rect = canvas.getBoundingClientRect()
      prevMouseAbs.x = mouseAbs.x
      prevMouseAbs.y = mouseAbs.y
      mouseAbs.x = clientX - rect.left
      mouseAbs.y = clientY - rect.top

      // Raw cursor velocity (pixels per event)
      mouseVelocity.x = mouseAbs.x - prevMouseAbs.x
      mouseVelocity.y = mouseAbs.y - prevMouseAbs.y

      // Push to trail history
      trailHistory.push({ x: mouseAbs.x, y: mouseAbs.y, age: 0 })
      if (trailHistory.length > TRAIL_LENGTH) trailHistory.shift()

      // ── Follow-offset: keep cursor OUTSIDE the sphere ────────────────
      // Target is computed dynamically each frame in render(), not here.
      // We only store the mouse position as the attraction point.

      mouse.x = (clientX / window.innerWidth) * 2 - 1
      mouse.y = (clientY / window.innerHeight) * 2 - 1
      const isMobile = window.innerWidth < 768
      const tiltMult = isMobile ? 0.15 : 0.35
      targetRotation.y = mouse.x * tiltMult
      targetRotation.x = -mouse.y * tiltMult
    }

    const handleMouseMove = (e) => handleInteraction(e.clientX, e.clientY)
    const handleTouchMove = (e) => {
      if (e.touches[0]) handleInteraction(e.touches[0].clientX, e.touches[0].clientY)
    }

    window.addEventListener('resize', setSize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    // 3D Setup
    let particles = []
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const focalLength = isMobile ? 300 : 400
    
    const getColors = () => {
      if (typeof window === 'undefined') return ['#93c5fd', '#078462']
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
      return isDark ? ['#078462', '#1e40af'] : ['#93c5fd', '#078462']
    }

    const initParticles = () => {
      particles = []
      const colors = getColors()
      const isMobile = window.innerWidth < 768
      const numParticles = isMobile ? 600 : 1200
      const sphereRadius = isMobile ? 180 : 250
      
      // Fibonacci Sphere Algorithm for even distribution
      const phi = Math.PI * (3 - Math.sqrt(5))

      for (let i = 0; i < numParticles; i++) {
        const y = 1 - (i / (numParticles - 1)) * 2
        const radius = Math.sqrt(1 - y * y)
        const theta = phi * i

        const x = Math.cos(theta) * radius
        const z = Math.sin(theta) * radius

        // Outward scatter direction with some random variation
        const scatterDirX = x + (Math.random() - 0.5) * 0.4
        const scatterDirY = y + (Math.random() - 0.5) * 0.4
        const scatterDirZ = z + (Math.random() - 0.5) * 0.4
        const len = Math.sqrt(scatterDirX * scatterDirX + scatterDirY * scatterDirY + scatterDirZ * scatterDirZ)
        const scatterLen = len > 0.01 ? len : 1

        // Reduced scatter distance (tighter, cleaner cloud)
        particles.push({
          x: x * sphereRadius,
          y: y * sphereRadius,
          z: z * sphereRadius,
          scatterX: (scatterDirX / scatterLen) * (Math.random() * (isMobile ? 30 : 50) + (isMobile ? 10 : 20)),
          scatterY: (scatterDirY / scatterLen) * (Math.random() * (isMobile ? 30 : 50) + (isMobile ? 10 : 20)),
          scatterZ: (scatterDirZ / scatterLen) * (Math.random() * (isMobile ? 30 : 50) + (isMobile ? 10 : 20)),
          color: colors[Math.floor(Math.random() * colors.length)],
          size: isMobile ? 1.0 : 1.4,
          // Per-particle displacement for fluid trail persistence
          displaceX: 0,
          displaceY: 0,
        })
      }
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          initParticles()
        }
      })
    })
    observer.observe(document.documentElement, { attributes: true })

    setSize()

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      const isMobile = window.innerWidth < 768
      const time = Date.now() * 0.001

      // ── Smooth cursor velocity (for speed-dependent effects) ────────
      smoothVelocity.x += (mouseVelocity.x - smoothVelocity.x) * 0.12
      smoothVelocity.y += (mouseVelocity.y - smoothVelocity.y) * 0.12
      const cursorSpeed = Math.sqrt(smoothVelocity.x * smoothVelocity.x + smoothVelocity.y * smoothVelocity.y)
      // Decay raw velocity toward zero each frame
      mouseVelocity.x *= 0.82
      mouseVelocity.y *= 0.82

      // Age trail points
      for (let t of trailHistory) t.age += 1

      // ── Rotation smoothing ─────────────────────────────────────────
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.025
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.025

      // ── Sphere position: follow-offset OR autonomous drift ─────────
      const defaultCx = isMobile ? width * 0.5 : width * 0.65
      const defaultCy = isMobile ? height * 0.38 : height * 0.45

      if (!mouseActive) {
        autoTime += 0.0012
        targetCx = defaultCx + Math.sin(autoTime) * (isMobile ? 0 : width * 0.18)
        targetCy = defaultCy + Math.cos(autoTime * 0.7) * 30
      } else {
        // ── Follow-offset: keep the cursor OUTSIDE the sphere ──────────
        // Compute vector from sphere center → mouse
        const safeCx = currentCx === -1 ? defaultCx : currentCx
        const safeCy = currentCy === -1 ? defaultCy : currentCy
        const dMx = mouseAbs.x - safeCx
        const dMy = mouseAbs.y - safeCy
        const dMdist = Math.sqrt(dMx * dMx + dMy * dMy)
        const offsetDist = isMobile ? 220 : 320
        if (dMdist > 0.1) {
          // Sphere target = mouse minus the normalized direction * offset distance
          // This makes the sphere orbit around the cursor at `offsetDist` px away
          targetCx = mouseAbs.x - (dMx / dMdist) * offsetDist
          targetCy = mouseAbs.y - (dMy / dMdist) * offsetDist
        }
      }

      if (currentCx === -1) { currentCx = targetCx === -1 ? defaultCx : targetCx }
      if (currentCy === -1) { currentCy = targetCy === -1 ? defaultCy : targetCy }

      // Store previous center for sphere velocity
      prevCx = currentCx
      prevCy = currentCy

      currentCx += (targetCx - currentCx) * 0.04
      currentCy += (targetCy - currentCy) * 0.035

      const cx = currentCx
      const cy = currentCy

      // ── Track sphere center velocity for squash-and-stretch ────────
      const rawSVx = currentCx - prevCx
      const rawSVy = currentCy - prevCy
      sphereVelX += (rawSVx - sphereVelX) * 0.2
      sphereVelY += (rawSVy - sphereVelY) * 0.2
      const sphereSpeed = Math.sqrt(sphereVelX * sphereVelX + sphereVelY * sphereVelY)

      // Normalized sphere velocity direction
      const svLen = sphereSpeed > 0.001 ? sphereSpeed : 1
      const svNx = sphereVelX / svLen
      const svNy = sphereVelY / svLen

      // Stretch factor: clamp 0 → 0.45
      const stretchFactor = Math.min(sphereSpeed * 0.015, 0.45)

      // Normalized direction from sphere center → mouse (for teardrop pull)
      const toCursorX = mouseAbs.x - cx
      const toCursorY = mouseAbs.y - cy
      const toCursorDist = Math.sqrt(toCursorX * toCursorX + toCursorY * toCursorY)
      const tcNx = toCursorDist > 0.1 ? toCursorX / toCursorDist : 0
      const tcNy = toCursorDist > 0.1 ? toCursorY / toCursorDist : 0

      // Pull amount scales with cursor speed for elongated trailing tail
      const pullAmt = Math.min(cursorSpeed * 0.008, 0.28)

      // Sphere radius for teardrop weighting
      const sphereR = isMobile ? 180 : 250

      // ── Scatter factor based on cursor distance ────────────────────
      let targetScatter = 0.0
      if (hasInteracted) {
        if (mouseActive) {
          // If mouse is active, scatter decreases as the cursor gets closer
          const minDist = isMobile ? 220 : 320
          const maxDist = isMobile ? 450 : 650
          const t = (toCursorDist - minDist) / (maxDist - minDist)
          targetScatter = Math.max(0, Math.min(1, t))
        } else {
          targetScatter = 1.0 // Scatter when mouse is away after interaction
        }
      }
      currentScatter += (targetScatter - currentScatter) * 0.035

      // ── Dynamic CSS mask ───────────────────────────────────────────
      const maskPctX = ((cx / width) * 100).toFixed(1)
      const maskPctY = ((cy / height) * 100).toFixed(1)
      const maskW = isMobile ? '70%' : '60%'
      const maskH = isMobile ? '65%' : '65%'
      const maskVal = `radial-gradient(ellipse ${maskW} ${maskH} at ${maskPctX}% ${maskPctY}%, black 45%, transparent 85%)`
      canvas.style.webkitMaskImage = maskVal
      canvas.style.maskImage = maskVal

      // ── Opacity ────────────────────────────────────────────────────
      const targetOpacity = mouseActive ? 0.75 : 0.6
      globalOpacity += (targetOpacity - globalOpacity) * 0.035

      const rotY = currentRotation.y
      const rotX = currentRotation.x
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)

      // ── Speed-dependent physics multipliers ────────────────────────
      const speedNorm = Math.min(cursorSpeed / 25, 1)          // 0→1
      const swirlMultiplier = 0.40 + speedNorm * 0.50
      const repulsionBoost = 1.0 + speedNorm * 0.35
      const elongationBoost = 1.0 + speedNorm * 1.0

      // Fixed calm ripple — no speed-based vibration
      const rippleAmp = 14
      const rippleFreq = 0.02

      const sortedParticles = [...particles].map((p, idx) => {
        // ── Dynamic wave rippling (scales with sphere velocity) ─────
        const distortion = Math.sin(p.x * rippleFreq + time) *
                           Math.cos(p.y * rippleFreq + time) * rippleAmp

        // Gentle floating drift when scattered (using sine/cosine waves)
        const scatterNoiseX = Math.sin(time * 0.4 + idx * 0.1) * 15
        const scatterNoiseY = Math.cos(time * 0.35 + idx * 0.15) * 15
        const scatterNoiseZ = Math.sin(time * 0.25 + idx * 0.08) * 15

        const scX = (p.scatterX + scatterNoiseX) * currentScatter
        const scY = (p.scatterY + scatterNoiseY) * currentScatter
        const scZ = (p.scatterZ + scatterNoiseZ) * currentScatter

        // ── Squash-and-Stretch transform (relative to sphere center) ─
        let lx = p.x + distortion + scX
        let ly = p.y + distortion + scY
        const lz = p.z + distortion + scZ

        if (stretchFactor > 0.002) {
          // Project onto velocity axis and perpendicular axis
          const proj = lx * svNx + ly * svNy
          const perp = -lx * svNy + ly * svNx
          // Stretch along velocity, squash perpendicular
          const stretchScale = 1 + stretchFactor
          const squashScale = 1 / (1 + stretchFactor * 0.7)
          lx = proj * stretchScale * svNx - perp * squashScale * svNy
          ly = proj * stretchScale * svNy + perp * squashScale * svNx
        }

        // ── Teardrop pull (toward cursor side of the sphere) ─────────
        // Fade out pull when cursor is inside the sphere to prevent internal shape distortion
        const pullInsideScale = Math.max(0, Math.min(1, toCursorDist / sphereR))
        const activePullAmt = pullAmt * pullInsideScale
        if (activePullAmt > 0.003 && mouseActive) {
          const projCursor = lx * tcNx + ly * tcNy
          // Non-linear weighting: front face pulls more than back
          const pullFactor = Math.pow(Math.max(0, (projCursor / sphereR + 1) / 2), 2)
          lx += tcNx * pullFactor * activePullAmt * sphereR
          ly += tcNy * pullFactor * activePullAmt * sphereR
        }

        let x = lx * cosY - lz * sinY
        let z = lx * sinY + lz * cosY
        let y = ly * cosX - z * sinX
        z = ly * sinX + z * cosX
        return { ...p, rx: x, ry: y, rz: z, idx }
      }).sort((a, b) => b.rz - a.rz)

      for (let p of sortedParticles) {
        const den = focalLength + p.rz
        if (den <= 10) continue // Skip particles behind the camera viewport
        const scale = focalLength / den
        const px = p.rx * scale + cx
        const py = p.ry * scale + cy

        // ── Primary cursor interaction & Trail wake ─────────────────
        // Set shift to 0 so the cursor passes through without affecting the physical shape
        let shiftX = 0, shiftY = 0

        // ── Per-particle displacement smoothing ───────────────────────
        const srcParticle = particles[p.idx]
        srcParticle.displaceX += (shiftX - srcParticle.displaceX) * 0.18
        srcParticle.displaceY += (shiftY - srcParticle.displaceY) * 0.18
        srcParticle.displaceX *= 0.88
        srcParticle.displaceY *= 0.88

        const fpx = px + srcParticle.displaceX
        const fpy = py + srcParticle.displaceY

        // ── Aura exclusion zone (tighter: carve, not fade) ───────────
        const auraRadius = isMobile ? 140 : 220
        let opacity = globalOpacity
        const nDx = fpx - mouseAbs.x
        const nDy = fpy - mouseAbs.y
        const nDist = Math.sqrt(nDx * nDx + nDy * nDy)
        if (nDist < auraRadius) {
          opacity *= Math.pow(nDist / auraRadius, 2.5)
        }

        // ── Depth-based fade ─────────────────────────────────────────
        const depthFactor = Math.max(0, Math.min(1, (180 - p.rz) / 350))
        opacity *= Math.pow(depthFactor, isMobile ? 4 : 8)

        if (fpx > 0 && fpx < width && fpy > 0 && fpy < height && opacity > 0.02) {
          // Shrink drops in the scattered state to look like fine stardust (up to 45% smaller)
          const scatterSizeMultiplier = 1.0 - currentScatter * 0.45
          const perspectiveScale = p.size * scale * scatterSizeMultiplier
          // Ensure finalSize is strictly positive to prevent negative radius exceptions in roundRect
          const finalSize = Math.max(0.1, perspectiveScale * Math.pow(depthFactor, 2))
          const dropHeight = finalSize * (2.2 * elongationBoost)

          ctx.globalAlpha = Math.min(0.9, opacity)
          ctx.fillStyle = p.color

          // Orient capsule: displacement direction or toward cursor if idle
          const dispMag = Math.sqrt(srcParticle.displaceX * srcParticle.displaceX + srcParticle.displaceY * srcParticle.displaceY)
          let angle
          if (dispMag > 1.5) {
            angle = Math.atan2(srcParticle.displaceY, srcParticle.displaceX) + Math.PI / 2
          } else {
            angle = Math.atan2(mouseAbs.y - fpy, mouseAbs.x - fpx) + Math.PI / 2
          }

          ctx.save()
          ctx.translate(fpx, fpy)
          ctx.rotate(angle)
          ctx.beginPath()
          ctx.roundRect(-finalSize / 2, -dropHeight / 2, finalSize, dropHeight, finalSize / 2)
          ctx.fill()
          ctx.restore()
        }
      }
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', setSize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      observer.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

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
    }, { threshold: 0.4 })
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
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
            display: 'flex', gap: 'clamp(32px, 6vw, 64px)', justifyContent: 'center',
            padding: '28px 48px',
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