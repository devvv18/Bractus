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
    let targetRotation = { x: 0, y: 0 }
    let currentRotation = { x: 0, y: 0 }

    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
      targetRotation.y = mouse.x * 0.5
      targetRotation.x = -mouse.y * 0.5
    }

    window.addEventListener('resize', setSize)
    window.addEventListener('mousemove', handleMouseMove)

    // 3D Setup
    let particles = []
    const spacing = 45 // Structured spacing like the 2D version
    const focalLength = 400
    
    const getColors = () => {
      if (typeof window === 'undefined') return ['#2F5496', '#638BF2', '#10b981']
      const styles = getComputedStyle(document.documentElement)
      const accent = styles.getPropertyValue('--accent').trim() || '#2F5496'
      return [accent, '#638BF2', '#10b981']
    }

    const initParticles = () => {
      particles = []
      const colors = getColors()
      const cols = 15
      const rows = 12
      const depths = 4 // Multiple layers for 3D depth

      for (let z = 0; z < depths; z++) {
        for (let x = 0; x < cols; x++) {
          for (let y = 0; y < rows; y++) {
            particles.push({
              // Center the grid locally before projection
              x: (x - cols/2) * spacing,
              y: (y - rows/2) * spacing,
              z: (z - depths/2) * spacing * 2.5, // Spread layers further for better parallax
              color: colors[Math.floor(Math.random() * colors.length)],
              size: 1.4
            })
          }
        }
      }
    }

    setSize()

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Smooth rotation easing - ONLY driven by mouse
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05

      const rotY = currentRotation.y
      const rotX = currentRotation.x

      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)

      const cx = width * 0.3
      const cy = height / 2

      const sortedParticles = [...particles].map(p => {
        // Rotate Y
        let x = p.x * cosY - p.z * sinY
        let z = p.x * sinY + p.z * cosY
        // Rotate X
        let y = p.y * cosX - z * sinX
        z = p.y * sinX + z * cosX
        return { ...p, rx: x, ry: y, rz: z }
      }).sort((a, b) => b.rz - a.rz)

      for (let p of sortedParticles) {
        const scale = focalLength / (focalLength + p.rz)
        const px = p.rx * scale + cx
        const py = p.ry * scale + cy
        
        // Depth based diminishing: Front is dark/vibrant (max 0.9), Back is faded (min 0.02)
        // Range of rz is approx [-200, 200]
        const opacity = (250 - p.rz) / 500 
        const finalSize = p.size * scale

        if (px > 0 && px < width && py > 0 && py < height) {
          ctx.globalAlpha = Math.max(0.02, Math.min(0.9, opacity))
          ctx.fillStyle = p.color
          ctx.beginPath()
          ctx.arc(px, py, finalSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', setSize)
      window.removeEventListener('mousemove', handleMouseMove)
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
        opacity: 0.8,
        // Horizontal mask to focus effect on left half
        WebkitMaskImage: 'linear-gradient(to right, black 40%, rgba(0,0,0,0.1) 80%, transparent)',
        maskImage: 'linear-gradient(to right, black 40%, rgba(0,0,0,0.1) 80%, transparent)',
      }}
    />
  )
}

export default function Hero() {
  const contactEmail = process?.env?.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@bractus.com';
  const statsRef = useRef(null)
  const [counts, setCounts] = useState({ c0: 0, c1: 0, c2: 0, c3: 0 })
  const animated = useRef(false)

  const STATS = [
    { end: 120, suffix: '+', label: 'Clients Served' },
    { end: 50,  suffix: '+', label: 'Projects Delivered' },
    { end: 98,  suffix: '%', label: 'Satisfaction Rate' },
    { end: 8,   suffix: '+', label: 'Years Experience' },
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

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 72 }}>
        <div style={{
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: 40,
          flexWrap: 'wrap'
        }}>
          {/* Content Column (Left) */}
          <div style={{
            flex: '1 1 500px',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
            <div className="anim-fade-up anim-delay-1" style={{ marginBottom: 28, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <span className="tag">✦ COMPREHENSIVE IT SOLUTIONS</span>
              <span className="tag">✦ END-TO-END TECHNOLOGY PARTNER</span>
            </div>

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
              maxWidth: 600,
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

            <div className="anim-fade-up anim-delay-4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
              <a href={`mailto:${contactEmail}?subject=Schedule%20a%20Call%20with%20Bractus&body=Hello%20Bractus%20Team%2C%0A%0AI%20would%20like%20to%20schedule%20a%20call%20to%20discuss%20how%20your%20technology%20services%20can%20help%20my%20organization.%0A%0ALooking%20forward%20to%20hearing%20from%20you%21`} className="btn-primary">Schedule a call</a>
              <a href="/services" className="btn-outline">View Our Services</a>
            </div>
          </div>

          {/* Visual Column (Right) */}
          <div className="anim-fade-up anim-delay-2" style={{
            flex: '1 1 450px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 500
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
              animation: 'slowZoom 12s ease-in-out infinite'
            }}>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img 
                  src="/assets/hero-dark.png" 
                  alt="Digital Connectivity"
                  style={{ width: '100%', display: 'block', transform: 'scale(1.1)' }}
                  className="hide-light"
                />
                <img 
                  src="/assets/hero-light.png" 
                  alt="Digital Connectivity"
                  style={{ width: '100%', display: 'block', transform: 'scale(1.1)' }}
                  className="show-light"
                />
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, width: '100%', height: '100%',
                  background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
                  backgroundSize: '300% 100%',
                  animation: 'lightTravel 4s linear infinite',
                  mixMode: 'overlay',
                  pointerEvents: 'none',
                  zIndex: 1
                }} />
              </div>

              <div ref={statsRef} style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                pointerEvents: 'none'
              }}>
                {STATS.map(({ suffix, label }, i) => (
                  <div key={label} style={{
                    position: 'absolute',
                    textAlign: 'center',
                    animation: `drift ${6 + i}s ease-in-out infinite`,
                    top: i === 0 ? '22%' : i === 1 ? '62%' : i === 2 ? '38%' : '78%',
                    left: i === 0 ? '18%' : i === 1 ? '12%' : i === 2 ? '62%' : '58%',
                    zIndex: 2,
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                  }}>
                    <div 
                      className="stat-number"
                      style={{
                        fontFamily: 'Nunito, sans-serif',
                        fontSize: '2.2rem',
                        fontWeight: 800, 
                        textShadow: '0 0 15px rgba(255,255,255,0.4)'
                      }}
                    >
                      {counts[`c${i}`]}{suffix}
                    </div>
                    <div style={{
                      fontSize: '0.8rem', 
                      color: 'var(--text)',
                      textTransform: 'uppercase', 
                      letterSpacing: '0.12em', 
                      fontWeight: 700,
                      marginTop: -4,
                      background: 'var(--surface)',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      opacity: 0.9,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
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