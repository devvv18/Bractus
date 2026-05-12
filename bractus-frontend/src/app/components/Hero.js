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
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
        }}>
          {/* Tag */}
      <div className="anim-fade-up" style={{ marginBottom: 28, display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
        <span className="tag">✦ COMPREHENSIVE IT SOLUTIONS</span>
        <span className="tag">✦ END-TO-END TECHNOLOGY PARTNER</span>
      </div>

          {/* Headline */}
          <h1 className="anim-fade-up anim-delay-1" style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            marginBottom: 24,
          }}>
            We Build, Scale, and Modernize<br />
            <span className="accent-text">Complex Software Systems</span>
          </h1>

          {/* Subtext */}
          <p className="anim-fade-up anim-delay-2" style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            maxWidth: 680,
            marginBottom: 32,
          }}>
            Your all-in-one partner for digital transformation. Whether building
            standard web applications to advanced DevOps, data pipelines, or reshaping
            an outdated legacy system and architecting a cutting-edge AI platform from
            the ground up, our cross-functional teams deliver scalable, high-performance
            results. We provide the technical muscle to bring any digital vision to life.
          </p>

          {/* Badge row */}
          <div className="anim-fade-up anim-delay-2" style={{
            display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 40,
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
          <div className="anim-fade-up anim-delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 64 }}>
            <a href={`mailto:${contactEmail}?subject=Schedule%20a%20Call%20with%20Bractus&body=Hello%20Bractus%20Team%2C%0A%0AI%20would%20like%20to%20schedule%20a%20call%20to%20discuss%20how%20your%20technology%20services%20can%20help%20my%20organization.%0A%0ALooking%20forward%20to%20hearing%20from%20you%21`} className="btn-primary">Schedule a call</a>
            <a href="/services" className="btn-outline">View Our Services</a>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="anim-fade-up anim-delay-4" style={{
          display: 'flex', gap: 'clamp(32px, 6vw, 64px)', justifyContent: 'center',
         padding: '28px 48px',
         borderRadius: 16,
         background: 'var(--accent)',
         boxShadow: '0 8px 32px rgba(47,84,150,0.18)',
         width: '100%', maxWidth: 720,
         marginTop: 8,
         }}>
         {STATS.map(({ suffix, label }, i) => (
         <div key={label} style={{ textAlign: 'center' }}>
         <div style={{
         fontFamily: 'Nunito, sans-serif',
         fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
         fontWeight: 700, color: '#fff',
         }}>{counts[`c${i}`]}{suffix}</div>
         <div style={{
         fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)',
         textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4,
         }}>{label}</div>
         </div>
        ))}
        </div>
        </div>
      </div>
    </section>
  )
}