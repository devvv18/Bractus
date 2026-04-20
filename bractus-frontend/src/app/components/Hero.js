'use client'
import { useEffect, useRef } from 'react'

const STATS = [
  { value: '120+', label: 'Clients Served' },
  { value: '50+',  label: 'Projects Delivered' },
  { value: '98%',  label: 'Satisfaction Rate' },
]

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      a: Math.random(),
      speed: Math.random() * 0.008 + 0.003,
    }))

    const draw = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        s.a += s.speed
        const opacity = (Math.sin(s.a) + 1) / 2
        ctx.beginPath()
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(167,139,250,${opacity * 0.7})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(80px, 10vh, 140px) clamp(20px, 6vw, 96px)',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 70%), #08090d',
      }}
    >
      {/* Star canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />

      {/* Blob 1 */}
      <div className="mesh-blob" style={{
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)',
        top: '-10%', left: '-10%',
      }} />
      {/* Blob 2 */}
      <div className="mesh-blob animate-float" style={{
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
        top: '30%', right: '-5%',
        animationDelay: '1s',
      }} />
      {/* Blob 3 */}
      <div className="mesh-blob animate-float" style={{
        width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
        bottom: '10%', left: '30%',
        animationDelay: '3s',
      }} />

      {/* Rotating ring */}
      <div style={{
        position: 'absolute', right: 'clamp(30px, 8vw, 120px)', top: '50%',
        transform: 'translateY(-50%)',
        width: 420, height: 420,
      }} className="hidden lg:block">
        <div className="animate-spin-slow" style={{
          width: '100%', height: '100%',
          borderRadius: '50%',
          border: '1px solid rgba(167,139,250,0.12)',
          position: 'absolute',
        }} />
        <div style={{
          position: 'absolute', inset: 30,
          borderRadius: '50%',
          border: '1px dashed rgba(96,165,250,0.1)',
        }} />
        {/* Center glow orb */}
        <div style={{
          position: 'absolute', inset: '25%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.5) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)',
          boxShadow: '0 0 80px rgba(124,58,237,0.4)',
        }} className="animate-float" />
        {/* Orbiting dot */}
        {[0, 120, 240].map((deg, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 10, height: 10,
            top: '50%', left: '50%',
            marginTop: -5, marginLeft: -5,
            transform: `rotate(${deg}deg) translateX(200px)`,
          }}>
            <div style={{
              width: '100%', height: '100%',
              borderRadius: '50%',
              background: i === 0 ? '#a78bfa' : i === 1 ? '#60a5fa' : '#34d399',
              boxShadow: `0 0 12px ${i === 0 ? '#a78bfa' : i === 1 ? '#60a5fa' : '#34d399'}`,
            }} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 680 }}>
        <span className="section-label animate-slide-up" style={{ marginBottom: 24, display: 'inline-flex' }}>
          <span style={{ color: '#34d399' }}>●</span> &nbsp;Available for new projects
        </span>

        <h1
          className="animate-slide-up"
          style={{
            fontFamily: 'Syne, Inter, sans-serif',
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: '#fff',
            marginTop: 16,
            marginBottom: 24,
            animationDelay: '0.1s',
          }}
        >
          We build the{' '}
          <span className="grad-text">future</span>{' '}
          of digital business
        </h1>

        <p className="animate-slide-up" style={{
          color: 'rgba(255,255,255,0.45)',
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          lineHeight: 1.75,
          maxWidth: 520,
          marginBottom: 40,
          animationDelay: '0.2s',
        }}>
          Bractus delivers world-class software, strategic consulting, and cutting-edge
          technology that helps businesses scale faster and smarter.
        </p>

        <div className="animate-slide-up" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', animationDelay: '0.3s' }}>
          <a
            href="#services"
            className="btn-glow"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
              color: '#fff',
              padding: '14px 30px',
              borderRadius: 12,
              fontWeight: 600,
              fontSize: '0.95rem',
              textDecoration: 'none',
              border: '1px solid rgba(167,139,250,0.3)',
              boxShadow: '0 0 32px rgba(124,58,237,0.35)',
            }}
          >
            Explore services →
          </a>
          <a
            href="#contact"
            style={{
              color: 'rgba(255,255,255,0.7)',
              padding: '14px 30px',
              borderRadius: 12,
              fontWeight: 600,
              fontSize: '0.95rem',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.4)'; e.currentTarget.style.color = '#a78bfa' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
          >
            Talk to us
          </a>
        </div>

        {/* Stats */}
        <div className="animate-slide-up" style={{
          display: 'flex', gap: 'clamp(24px, 5vw, 56px)',
          marginTop: 56,
          paddingTop: 32,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          animationDelay: '0.4s',
        }}>
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <div
                className="grad-text"
                style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800 }}
              >
                {value}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}