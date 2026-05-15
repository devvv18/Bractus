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
    let mouseAbs = { x: -1000, y: -1000 }
    let targetRotation = { x: 0, y: 0 }
    let currentRotation = { x: 0, y: 0 }
    let targetCenter = { x: 0, y: 0 }
    let currentCenter = { x: 0, y: 0 }
    let mouseActive = false
    let globalOpacity = 0

    const handleInteraction = (clientX, clientY) => {
      mouseActive = true
      const rect = canvas.getBoundingClientRect()
      mouseAbs.x = clientX - rect.left
      mouseAbs.y = clientY - rect.top

      mouse.x = (clientX / window.innerWidth) * 2 - 1
      mouse.y = (clientY / window.innerHeight) * 2 - 1
      
      const isMobile = window.innerWidth < 768
      const tiltMult = isMobile ? 0.2 : 0.4
      targetRotation.y = mouse.x * tiltMult
      targetRotation.x = -mouse.y * tiltMult

      // Increased vertical range (180) so it can go till bottom
      const moveMultX = isMobile ? 30 : 60
      const moveMultY = isMobile ? 80 : 180
      targetCenter.x = mouse.x * moveMultX
      targetCenter.y = mouse.y * moveMultY
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
    const spacing = isMobile ? 18 : 22 
    const focalLength = isMobile ? 300 : 400
    
    const getColors = () => {
      if (typeof window === 'undefined') return ['#1E40AF', '#166534']
      const styles = getComputedStyle(document.documentElement)
      const accent = styles.getPropertyValue('--accent').trim() || '#1E40AF'
      return [accent, '#166534']
    }

    const initParticles = () => {
      particles = []
      const colors = getColors()
      const isMobile = window.innerWidth < 768
      const numParticles = isMobile ? 600 : 1200
      const sphereRadius = isMobile ? 180 : 250
      
      // Fibonacci Sphere Algorithm for even distribution
      const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle

      for (let i = 0; i < numParticles; i++) {
        const y = 1 - (i / (numParticles - 1)) * 2 // y goes from 1 to -1
        const radius = Math.sqrt(1 - y * y) // radius at y
        const theta = phi * i // golden angle increment

        const x = Math.cos(theta) * radius
        const z = Math.sin(theta) * radius

        particles.push({
          x: x * sphereRadius,
          y: y * sphereRadius,
          z: z * sphereRadius,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: isMobile ? 1.6 : 2.2 
        })
      }
    }

    setSize()

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      const isMobile = window.innerWidth < 768
      const time = Date.now() * 0.002 // For slimy movement

      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05
      
      // Dialed back speed for a more fluid feel
      currentCenter.x += (targetCenter.x - currentCenter.x) * 0.08
      currentCenter.y += (targetCenter.y - currentCenter.y) * 0.08

      if (mouseActive) {
        globalOpacity += (0.6 - globalOpacity) * 0.05
      }

      const rotY = currentRotation.y
      const rotX = currentRotation.x

      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)

      // Anchor to left-half and more centered vertically to allow travel
      const cx = (isMobile ? width * 0.5 : width * 0.25) + currentCenter.x
      const cy = (isMobile ? height * 0.4 : height * 0.45) + currentCenter.y

      const sortedParticles = [...particles].map(p => {
        // Slimy Deformation: Wobble the radius based on position and time
        const distortion = Math.sin(p.x * 0.02 + time) * Math.cos(p.y * 0.02 + time) * 15
        const sx = p.x + distortion
        const sy = p.y + distortion
        const sz = p.z + distortion

        let x = sx * cosY - sz * sinY
        let z = sx * sinY + sz * cosY
        let y = sy * cosX - z * sinX
        z = sy * sinX + z * cosX
        return { ...p, rx: x, ry: y, rz: z }
      }).sort((a, b) => b.rz - a.rz)

      for (let p of sortedParticles) {
        const scale = focalLength / (focalLength + p.rz)
        const px = p.rx * scale + cx
        const py = p.ry * scale + cy
        
        const dx = px - mouseAbs.x
        const dy = py - mouseAbs.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        const repulsionRadius = isMobile ? 250 : 400 // Expanded repulsion
        const repulsionPower = isMobile ? 25 : 40
        
        let shiftX = 0, shiftY = 0
        if (dist < repulsionRadius) {
          const force = (1 - dist / repulsionRadius) * repulsionPower
          shiftX = (dx / dist) * force
          shiftY = (dy / dist) * force
        }

        const fpx = px + shiftX
        const fpy = py + shiftY
        
        const auraRadius = isMobile ? 150 : 250 // Expanded invisible hole
        let opacity = globalOpacity
        
        const nDx = fpx - mouseAbs.x
        const nDy = fpy - mouseAbs.y
        const nDist = Math.sqrt(nDx * nDx + nDy * nDy)

        if (nDist < auraRadius) {
          opacity *= Math.pow(nDist / auraRadius, 2)
        }
        
        const depthFactor = Math.max(0, Math.min(1, (180 - p.rz) / 350))
        opacity *= Math.pow(depthFactor, isMobile ? 4 : 8)

        if (fpx > 0 && fpx < width && fpy > 0 && fpy < height && opacity > 0.02) {
          const perspectiveScale = p.size * scale
          // Extra size falloff for depth to clean up the back
          const finalSize = perspectiveScale * Math.pow(depthFactor, 2)
          const dropHeight = finalSize * 2.2 

          ctx.globalAlpha = Math.min(0.9, opacity)
          ctx.fillStyle = p.color
          
          const angle = Math.atan2(mouseAbs.y - fpy, mouseAbs.x - fpx)

          ctx.save()
          ctx.translate(fpx, fpy)
          ctx.rotate(angle + Math.PI / 2) 
          
          ctx.beginPath()
          ctx.roundRect(
            -finalSize / 2, 
            -dropHeight / 2, 
            finalSize, 
            dropHeight, 
            finalSize / 2
          )
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
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

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
        WebkitMaskImage: isMobile 
          ? 'radial-gradient(circle, black 60%, transparent 95%)'
          : 'linear-gradient(to right, black 35%, rgba(0,0,0,0.1) 70%, transparent)',
        maskImage: isMobile 
          ? 'radial-gradient(circle, black 60%, transparent 95%)'
          : 'linear-gradient(to right, black 35%, rgba(0,0,0,0.1) 70%, transparent)',
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

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 72 }}>

        {/* Tags — centered across full width, above the two columns */}
        <div className="anim-fade-up" style={{
          display: 'flex',
          gap: 20,
          flexWrap: 'nowrap',
          justifyContent: 'center',
          marginBottom: 40
        }}>
          <span className="tag">✦ COMPREHENSIVE IT SOLUTIONS</span>
          <span className="tag">✦ END-TO-END TECHNOLOGY PARTNER</span>
        </div>

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
          <div className="anim-fade-up anim-delay-1" style={{
            flex: '1 1 450px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minHeight: 600
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
              animation: 'slowZoom 12s ease-in-out infinite',
              marginTop: '-20px'
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

                {/* Light-Travel Shimmer Overlay */}
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
                    // Precise docking positions to feel integrated with the 3D wires
                    top: i === 0 ? '12%' : i === 1 ? '55%' : i === 2 ? '28%' : '72%',
                    left: i === 0 ? '15%' : i === 1 ? '5%' : i === 2 ? '60%' : '55%',
                    zIndex: 2,
                    // Glass Node Styling
                    background: 'rgba(var(--bg-rgb), 0.6)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    padding: '12px 20px',
                    borderRadius: '20px',
                    border: '1px solid var(--border)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    transition: 'transform 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                  }}>
                    <div
                      className="stat-number"
                      style={{
                        fontFamily: 'Nunito, sans-serif',
                        fontSize: '2rem',
                        fontWeight: 800,
                        lineHeight: 1,
                        marginBottom: 4
                      }}
                    >
                      {counts[`c${i}`]}{suffix}
                    </div>
                    <div style={{
                      fontSize: '0.72rem',
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      fontWeight: 700,
                    }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 65, marginBottom: 40 }}>
          <div ref={statsRef} className="anim-fade-up anim-delay-4" style={{
            display: 'flex', gap: 'clamp(32px, 6vw, 64px)', justifyContent: 'center',
            padding: '28px 48px',
            borderRadius: 20,
            background: 'var(--accent)',
            boxShadow: '0 12px 32px rgba(47,84,150,0.15)',
            width: '100%', maxWidth: 850,
          }}>
            {STATS.map(({ suffix, label }, i) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                  fontWeight: 800, color: '#fff',
                }}>{counts[`c${i}`]}{suffix}</div>
                <div style={{
                  fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)',
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