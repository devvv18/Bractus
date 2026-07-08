'use client'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

const UnifiedCanvas = ({ hoverLeft, hoverRight }) => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const hoverRef = useRef({ left: false, right: false })
  const timeRef = useRef(0)

  // Sync props to refs so the render loop always has latest values without re-running useEffect
  useEffect(() => {
    hoverRef.current = { left: hoverLeft, right: hoverRight }
  }, [hoverLeft, hoverRight])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    let animationFrameId
    const friction = 0.97 // Much more buttery
    const spring = 0.0015 // Softer, cuter gathering force
    const dotRadius = 1.3

    const resize = () => {
      if (!canvas.parentElement) return
      canvas.width = window.innerWidth
      canvas.height = canvas.parentElement.getBoundingClientRect().height || canvas.parentElement.offsetHeight
      initParticles()
    }

    const initParticles = () => {
      const w = canvas.width
      const h = canvas.height
      if (w === 0 || h === 0) return

      const off = document.createElement('canvas')
      off.width = w
      off.height = h
      const octx = off.getContext('2d', { willReadFrequently: true })

      const isMobile = w < 768
      const cxLeft = isMobile ? w / 2 : w * 0.25
      const cxRight = isMobile ? w / 2 : w * 0.75
      
      const cyLeft = isMobile ? h * 0.18 : h / 2
      const cyRight = isMobile ? h * 0.68 : h / 2

      // Draw Shape 1: Massive Custom < / > 
      octx.clearRect(0, 0, w, h)
      octx.lineCap = 'round'
      octx.lineJoin = 'round'
      octx.lineWidth = 26 // Even thicker as requested
      octx.strokeStyle = '#fff'

      // Much larger scale for desktop/mobile
      const sW = Math.min(w, h) * (isMobile ? 0.35 : 0.28) 
      const sH = Math.min(w, h) * (isMobile ? 0.28 : 0.25)
      
      // Draw '<' (Far left, larger, 75-degree angle)
      octx.beginPath()
      octx.moveTo(cxLeft - sW * 1.5, cyLeft)
      octx.lineTo(cxLeft - sW * 0.6, cyLeft - sH * 0.7)
      octx.moveTo(cxLeft - sW * 1.5, cyLeft)
      octx.lineTo(cxLeft - sW * 0.6, cyLeft + sH * 0.7)
      octx.stroke()

      // Draw '/' (Even shorter for compact look)
      octx.beginPath()
      octx.moveTo(cxLeft - sW * 0.2, cyLeft + sH * 1.0)
      octx.lineTo(cxLeft + sW * 0.2, cyLeft - sH * 1.0)
      octx.stroke()

      // Draw '>' (Far right, larger, 75-degree angle)
      octx.beginPath()
      octx.moveTo(cxLeft + sW * 1.5, cyLeft)
      octx.lineTo(cxLeft + sW * 0.6, cyLeft - sH * 0.7)
      octx.moveTo(cxLeft + sW * 1.5, cyLeft)
      octx.lineTo(cxLeft + sW * 0.6, cyLeft + sH * 0.7)
      octx.stroke()

      const dataLeft = octx.getImageData(0, 0, w, h).data

      // Draw Shape 2: Honeycomb
      octx.clearRect(0, 0, w, h)
      const hexR = Math.min(w, h) * (isMobile ? 0.045 : 0.05) 
      const hexW = Math.sqrt(3) * hexR
      const hexH = 2 * hexR
      const ySpacing = hexH * 0.75
      octx.lineWidth = 14 // Thicker honeycomb too
      octx.lineJoin = 'round'
      for (let r = -4; r <= 4; r++) {
        for (let c = -4; c <= 4; c++) {
          if (Math.sqrt(r*r + c*c) > 4.2) continue
          let hx = cxRight + c * hexW + (r % 2 ? hexW / 2 : 0)
          let hy = cyRight + r * ySpacing
          octx.beginPath()
          for (let e = 0; e <= 6; e++) {
            const a = (Math.PI / 3) * e - Math.PI / 6
            octx.lineTo(hx + hexR * Math.cos(a), hy + hexR * Math.sin(a))
          }
          octx.stroke()
        }
      }
      const dataRight = octx.getImageData(0, 0, w, h).data

      const getColors = () => {
        if (typeof window === 'undefined') return ['rgba(1, 63, 74, 0.9)', 'rgba(99, 139, 242, 0.9)', 'rgba(7, 132, 98, 0.9)']
        const styles = getComputedStyle(document.documentElement)
        const accent = styles.getPropertyValue('--accent').trim() || '#013F4A'
        return [
          accent,        // Theme Accent
          '#638BF2',     // Magic Blue
          '#078462'      // Magic Green
        ]
      }

      const newParticles = []
      const spacing = 5 // Denser sampling for thicker lines
      const colors = getColors()

      for (let y = 0; y < h; y += spacing) {
        for (let x = 0; x < w; x += spacing) {
          const isL = dataLeft[(y * w + x) * 4 + 3] > 128
          const isR = dataRight[(y * w + x) * 4 + 3] > 128
          
          if (isL || isR) {
            newParticles.push({
              x: Math.random() * w, y: Math.random() * h,
              baseX: Math.random() * w, baseY: Math.random() * h,
              targetX: x, targetY: y,
              vx: 0, vy: 0,
              isLeft: isL,
              randomWander: Math.random() * 100,
              // Speed factor for 'organic' boom
              speedFactor: 0.5 + Math.random() * 0.5,
              color: colors[Math.floor(Math.random() * colors.length)]
            })
          }
        }
      }
      particlesRef.current = newParticles
    }

    const render = () => {
      timeRef.current += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const isMobile = canvas.width < 768
      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        let tx = p.baseX
        let ty = p.baseY

        const active = (p.isLeft && hoverRef.current.left) || (!p.isLeft && hoverRef.current.right)
        
        if (active) {
          tx = p.targetX
          ty = p.targetY

          // Very slow, subtle "hovering" motion for the </> shape only
          if (p.isLeft) {
            const hoverTime = timeRef.current * 0.5
            tx += Math.sin(hoverTime + p.randomWander) * 4
            ty += Math.cos(hoverTime + p.randomWander) * 4
          }
          
          ctx.fillStyle = p.color
          
          // DIRECT EASING (No double movement/vibration)
          p.x += (tx - p.x) * 0.08 * p.speedFactor
          p.y += (ty - p.y) * 0.08 * p.speedFactor
          p.vx = 0 // Kill existing velocity for absolute precision
          p.vy = 0
        } else {
          ctx.fillStyle = p.color
          ctx.globalAlpha = 0.3
          
          // Organic Spring Physics for background
          tx += Math.sin(timeRef.current + p.randomWander) * 4
          ty += Math.cos(timeRef.current + p.randomWander) * 4

          p.vx += (tx - p.x) * spring * p.speedFactor
          p.vy += (ty - p.y) * spring * p.speedFactor
          p.vx *= friction
          p.vy *= friction
          p.x += p.vx
          p.y += p.vy
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1.0
      }
      animationFrameId = requestAnimationFrame(render)
    }

    window.addEventListener('resize', resize)
    resize()
    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, []) // Empty dependency array = Runs once on mount

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block', pointerEvents: 'none' }}
    />
  )
}

export default function DualCards() {
  const [hoverLeft, setHoverLeft] = useState(false)
  const [hoverRight, setHoverRight] = useState(false)

  const contactEmail = process?.env?.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@bractus.com';

  const devSubject = encodeURIComponent("Engineering Support & Collaboration");
  const devBody = encodeURIComponent(
    `Hi Bractus Team,\n\n` +
    `I am reaching out to get some dedicated engineering support for my current project.\n` +
    `Here is a quick overview of what I am working on:\n` +
    `My Project: [Project Details]\n` +
    `Current Tech Stack: [Tech stack details]\n\n` +
    `I am looking for a reliable technical partner to help me push this across the finish line. Please let me know your availability for a quick introductory call to discuss how we might collaborate.\n\n` +
    `Best,\n` +
    `[Your Name]\n` +
    `[Link to your project/website, if applicable]`
  );

  const orgSubject = encodeURIComponent("Engineering & Development Services");
  const orgBody = encodeURIComponent(
    `Hi Bractus Team,\n\n` +
    `I am reaching out on behalf of [Your Company Name]. We are currently looking for a reliable technology partner to help us scale our engineering capabilities and execute our digital roadmap.\n\n` +
    `We are primarily looking for expertise in:\n` +
    `[e.g., Legacy System Modernization / Cloud Infrastructure / Building a new AI tool from scratch]\n\n` +
    `We need a dedicated team that can take technical ownership and deliver secure, high-performance results.\n\n` +
    `I would love to schedule a brief discovery call this week to discuss our upcoming initiatives and see if Bractus is the right fit to support our growth. Let me know what your schedule looks like over the next few days.\n\n` +
    `Best regards,\n` +
    `[Your Name]\n` +
    `[Your Job Title]\n` +
    `[Your Company Name]`
  );

  return (
    <section style={{ background: 'var(--bg)', padding: 0, position: 'relative' }}>
      {/* Unified Background Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <UnifiedCanvas hoverLeft={hoverLeft} hoverRight={hoverRight} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: '85vh', position: 'relative', zIndex: 1 }}>
        {/* Left Card */}
        <div
          style={{ flex: 1, minWidth: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(60px, 12vw, 100px) 48px' }}
          onMouseEnter={() => setHoverLeft(true)}
          onMouseLeave={() => setHoverLeft(false)}
        >
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>For Individual Technical Support</h2>
            <p style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 300, color: 'var(--text-secondary)', marginBottom: 32, maxWidth: 420 }}>Get the dedicated engineering support and expert guidance.</p>
            <a href={`mailto:${contactEmail}?subject=${devSubject}&body=${devBody}`} className="btn-primary" style={{ borderRadius: 100 }}>Request Support</a>
          </div>
        </div>

        {/* Vertical Divider - Hidden on Mobile */}
        <div className="hide-mobile" style={{ width: 1, background: 'var(--border)', opacity: 0.1 }} />

        {/* Right Card */}
        <div
          style={{ flex: 1, minWidth: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(60px, 12vw, 100px) 48px' }}
          onMouseEnter={() => setHoverRight(true)}
          onMouseLeave={() => setHoverRight(false)}
        >
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>For organization</h2>
            <p style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 300, color: 'var(--text-secondary)', marginBottom: 32, maxWidth: 420 }}>Scale your digital capabilities instantly.</p>
            <a href={`mailto:${contactEmail}?subject=${orgSubject}&body=${orgBody}`} className="btn-outline" style={{ borderRadius: 100, background: 'var(--bg)' }}>Partner with us</a>
          </div>
        </div>
      </div>
    </section>
  )
}