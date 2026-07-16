'use client'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

const UnifiedCanvas = ({ hoverLeft, hoverRight }) => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const hoverRef = useRef({ left: false, right: false })
  const timeRef = useRef(0)
  const lastLHoverRef = useRef(false)
  const lastRHoverRef = useRef(false)

  // Sync props to refs so the render loop always has latest values without re-running useEffect
  useEffect(() => {
    hoverRef.current = { left: hoverLeft, right: hoverRight }
  }, [hoverLeft, hoverRight])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    let animationFrameId
    const dotRadius = 1.3

    const resize = () => {
      if (!canvas.parentElement) return
      const w = window.innerWidth
      const h = canvas.parentElement.getBoundingClientRect().height || canvas.parentElement.offsetHeight
      canvas.width = w
      canvas.height = h

      const sectionRect = canvas.parentElement.getBoundingClientRect()
      const leftEl = canvas.parentElement.querySelector('.left-card-text')
      const rightEl = canvas.parentElement.querySelector('.right-card-text')
      const isMobile = w < 768

      let cxLeft = isMobile ? w / 2 : w * 0.25
      let cyLeft = isMobile ? h * 0.25 : h / 2 - 30
      let cxRight = isMobile ? w / 2 : w * 0.730
      let cyRight = isMobile ? h * 0.75 : h / 2

      if (leftEl) {
        const rect = leftEl.getBoundingClientRect()
        cxLeft = rect.left - sectionRect.left + rect.width / 2
        cyLeft = rect.top - sectionRect.top + rect.height / 2
        // Shift brackets significantly upward on mobile to clear text
        cyLeft -= isMobile ? 100 : 30
      }
      if (rightEl) {
        const rect = rightEl.getBoundingClientRect()
        cxRight = rect.left - sectionRect.left + rect.width / 2
        cyRight = rect.top - sectionRect.top + rect.height / 2
        // Offset honeycomb slightly left if not on mobile, since lopsidedness shifts it right
        if (!isMobile) {
          cxRight -= w * 0.02
        }
      }

      initParticles(w, h, cxLeft, cyLeft, cxRight, cyRight)
    }

    const initParticles = (w, h, cxLeft, cyLeft, cxRight, cyRight) => {
      if (w === 0 || h === 0) return

      const off = document.createElement('canvas')
      off.width = w
      off.height = h
      const octx = off.getContext('2d', { willReadFrequently: true })

      const isMobile = w < 768

      // Draw Shape 1: Massive Custom < / > 
      octx.clearRect(0, 0, w, h)
      octx.lineCap = 'round'
      octx.lineJoin = 'round'
      octx.lineWidth = 26
      octx.strokeStyle = '#fff'

      const sW = Math.min(w, h) * (isMobile ? 0.32 : 0.35)
      const sH = Math.min(w, h) * (isMobile ? 0.24 : 0.29)

      octx.beginPath()
      octx.moveTo(cxLeft - sW * 1.5, cyLeft)
      octx.lineTo(cxLeft - sW * 0.40, cyLeft - sH * 0.7)
      octx.moveTo(cxLeft - sW * 1.5, cyLeft)
      octx.lineTo(cxLeft - sW * 0.40, cyLeft + sH * 0.7)
      octx.stroke()

      octx.beginPath()
      octx.moveTo(cxLeft - sW * 0.2, cyLeft + sH * 1.0)
      octx.lineTo(cxLeft + sW * 0.2, cyLeft - sH * 1.0)
      octx.stroke()

      octx.beginPath()
      octx.moveTo(cxLeft + sW * 1.5, cyLeft)
      octx.lineTo(cxLeft + sW * 0.40, cyLeft - sH * 0.7)
      octx.moveTo(cxLeft + sW * 1.5, cyLeft)
      octx.lineTo(cxLeft + sW * 0.40, cyLeft + sH * 0.7)
      octx.stroke()

      const dataLeft = octx.getImageData(0, 0, w, h).data

      // Draw Shape 2: Honeycomb
      octx.clearRect(0, 0, w, h)
      const hexR = Math.min(w, h) * (isMobile ? 0.045 : 0.05)
      const hexW = Math.sqrt(3) * hexR
      const hexH = 2 * hexR
      const ySpacing = hexH * 0.75
      octx.lineWidth = 14
      octx.lineJoin = 'round'
      for (let r = -4; r <= 4; r++) {
        for (let c = -4; c <= 4; c++) {
          if (Math.sqrt(r * r + c * c) > 4.2) continue
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

      const colors = getColors()
      const newParticles = []
      const gridSpacing = isMobile ? 15 : 18

      // Generate base grid of particles (clean rectangular grid)
      for (let y = gridSpacing / 2; y < h; y += gridSpacing) {
        for (let x = gridSpacing / 2; x < w; x += gridSpacing) {
          const isL = isMobile ? (y < h / 2) : (x < w / 2)
          newParticles.push({
            x: x, y: y,
            baseX: x, baseY: y,
            targetX: x, targetY: y,
            vx: 0, vy: 0,
            isLeft: isL,
            hasShapeTarget: false,
            randomWander: Math.random() * 100,
            speedFactor: 0.6 + Math.random() * 0.4,
            alpha: 0.35,
            color: '#94a3b8' // Muted background color
          })
        }
      }

      // Sample Left shape points with larger step to avoid oversampling
      const shapePointsLeft = []
      const sampleStep = isMobile ? 11 : 8
      for (let y = 0; y < h; y += sampleStep) {
        for (let x = 0; x < w; x += sampleStep) {
          if (dataLeft[(y * w + x) * 4 + 3] > 128) {
            shapePointsLeft.push({ x, y })
          }
        }
      }

      // Sample Right shape points
      const shapePointsRight = []
      for (let y = 0; y < h; y += sampleStep) {
        for (let x = 0; x < w; x += sampleStep) {
          if (dataRight[(y * w + x) * 4 + 3] > 128) {
            shapePointsRight.push({ x, y })
          }
        }
      }

      // Match Left shape points to nearest left grid particles
      const leftGrid = newParticles.filter(p => p.isLeft)
      for (const pt of shapePointsLeft) {
        let closestP = null
        let minDist = Infinity
        for (const p of leftGrid) {
          if (p.hasShapeTarget) continue
          const dx = p.baseX - pt.x
          const dy = p.baseY - pt.y
          const dist = dx * dx + dy * dy
          if (dist < minDist) {
            minDist = dist
            closestP = p
          }
        }
        if (closestP) {
          closestP.targetX = pt.x
          closestP.targetY = pt.y
          closestP.hasShapeTarget = true
          closestP.color = colors[2] // Brand Green
        }
      }

      // Match Right shape points to nearest right grid particles
      const rightGrid = newParticles.filter(p => !p.isLeft)
      for (const pt of shapePointsRight) {
        let closestP = null
        let minDist = Infinity
        for (const p of rightGrid) {
          if (p.hasShapeTarget) continue
          const dx = p.baseX - pt.x
          const dy = p.baseY - pt.y
          const dist = dx * dx + dy * dy
          if (dist < minDist) {
            minDist = dist
            closestP = p
          }
        }
        if (closestP) {
          closestP.targetX = pt.x
          closestP.targetY = pt.y
          closestP.hasShapeTarget = true
          closestP.color = colors[2] // Brand Green
        }
      }

      particlesRef.current = newParticles
    }

    const render = () => {
      timeRef.current += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const particles = particlesRef.current

      const isLHover = hoverRef.current.left
      const isRHover = hoverRef.current.right
      const anyHovered = isLHover || isRHover

      // Detect unhover events (transitions from true -> false)
      const justLeftUnhovered = !isLHover && lastLHoverRef.current
      const justRightUnhovered = !isRHover && lastRHoverRef.current

      lastLHoverRef.current = isLHover
      lastRHoverRef.current = isRHover

      // Trigger "diffusion blast" on unhover by injecting random velocities
      if (justLeftUnhovered) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          if (p.isLeft && p.hasShapeTarget) {
            p.vx = (Math.random() - 0.5) * 4.5
            p.vy = (Math.random() - 0.5) * 4.5
          }
        }
      }
      if (justRightUnhovered) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          if (!p.isLeft && p.hasShapeTarget) {
            p.vx = (Math.random() - 0.5) * 4.5
            p.vy = (Math.random() - 0.5) * 4.5
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Active if this particle belongs to the hovered card's shape
        const active = p.hasShapeTarget && (
          (p.isLeft && isLHover) ||
          (!p.isLeft && isRHover)
        )

        let tx = active ? p.targetX : p.baseX
        let ty = active ? p.targetY : p.baseY

        // Target Alpha: 
        // 1.0 if part of the active gathered shape design
        // 0.35 otherwise (grid dots remain visible always)
        const targetAlpha = active ? 1.0 : 0.35

        // Smoothly transition opacity (slightly slower for smoother fade)
        p.alpha += (targetAlpha - p.alpha) * 0.04

        if (active) {
          // Direct Easing for gathering (fluid magnetic movement)
          p.x += (tx - p.x) * 0.042 * p.speedFactor
          p.y += (ty - p.y) * 0.042 * p.speedFactor
          p.vx = 0
          p.vy = 0
        } else {
          // Add subtle organic floating micro-wobble for background grid dots
          const driftTime = timeRef.current * 0.35
          const wx = tx + Math.sin(driftTime + p.randomWander) * 1.2
          const wy = ty + Math.cos(driftTime + p.randomWander) * 1.2

          // Cushioned Spring Physics for smooth settling back
          const spring = 0.012
          const friction = 0.93
          p.vx += (wx - p.x) * spring * p.speedFactor
          p.vy += (wy - p.y) * spring * p.speedFactor
          p.vx *= friction
          p.vy *= friction
          p.x += p.vx
          p.y += p.vy
        }

        ctx.fillStyle = active ? p.color : '#94a3b8'
        ctx.globalAlpha = p.alpha

        ctx.beginPath()
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1.0
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
          onTouchStart={() => setHoverLeft(true)}
          onTouchEnd={() => setHoverLeft(false)}
        >
          <div className="left-card-text" style={{ textAlign: 'center' }}>
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
          onTouchStart={() => setHoverRight(true)}
          onTouchEnd={() => setHoverRight(false)}
        >
          <div className="right-card-text" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>For organization</h2>
            <p style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 300, color: 'var(--text-secondary)', marginBottom: 32, maxWidth: 420 }}>Scale your digital capabilities instantly.</p>
            <a href={`mailto:${contactEmail}?subject=${orgSubject}&body=${orgBody}`} className="btn-outline" style={{ borderRadius: 100, background: 'var(--bg)' }}>Partner with us</a>
          </div>
        </div>
      </div>
    </section>
  )
}