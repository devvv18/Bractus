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
      initGrid()
    }

    let mouse = { x: -1000, y: -1000 }
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('resize', setSize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseLeave)

    // Grid Setup
    const spacing = 35
    let dots = []

    const initGrid = () => {
      dots = []
      for (let x = -spacing; x < width + spacing; x += spacing) {
        for (let y = -spacing; y < height + spacing; y += spacing) {
          dots.push({
            ox: x, oy: y,
            x: x, y: y,
            vx: 0, vy: 0
          })
        }
      }
    }

    setSize()

    const getAccentColor = () => {
      if (typeof window === 'undefined') return '#2F5496'
      const styles = getComputedStyle(document.documentElement)
      return styles.getPropertyValue('--accent').trim() || '#2F5496'
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = getAccentColor()

      for (let i = 0; i < dots.length; i++) {
        let dot = dots[i]

        let dx = mouse.x - dot.x
        let dy = mouse.y - dot.y
        let distance = Math.sqrt(dx * dx + dy * dy)

        let forceRadius = 180

        if (distance < forceRadius) {
          let force = (forceRadius - distance) / forceRadius
          let angle = Math.atan2(dy, dx)
          dot.vx -= Math.cos(angle) * force * 1.2
          dot.vy -= Math.sin(angle) * force * 1.2
        }

        dot.vx += (dot.ox - dot.x) * 0.04
        dot.vy += (dot.oy - dot.y) * 0.04

        dot.vx *= 0.84
        dot.vy *= 0.84

        dot.x += dot.vx
        dot.y += dot.vy

        let speed = Math.abs(dot.vx) + Math.abs(dot.vy)
        let isDisturbed = speed > 0.3
        let size = 1.5 // Consistent dot radius

        ctx.globalAlpha = isDisturbed ? 0.6 : 0.15
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2)
        ctx.fill()
      }
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', setSize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseLeave)
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
        WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.12) 30%, black 75%)',
        maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.12) 30%, black 75%)',
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
          const step = Math.ceil(end / (1500 / 16))
          const timer = setInterval(() => {
            start += step
            if (start >= end) { start = end; clearInterval(timer) }
            setCounts(prev => ({ ...prev, [`c${i}`]: start }))
          }, 16)
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

            {/* Headline */}
            <h1 className="anim-fade-up" style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: 24,
            }}>
              We Build, Scale, and Modernize<br />
              <span className="accent-text">Complex Software Systems</span>
            </h1>

            {/* Subtext */}
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

            {/* Badge row */}
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

            {/* CTAs */}
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
            {/* The 3D Image with Auto-Theme Switch */}
            <div style={{
              position: 'relative',
              width: '100%',
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
              animation: 'slowZoom 12s ease-in-out infinite',
              marginTop: '-20px'
            }}>
              {/* Main 3D Image */}
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

              {/* Flowing Stats Overlay */}
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
    </section>
  )
}