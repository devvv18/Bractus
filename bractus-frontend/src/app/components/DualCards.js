'use client'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

const UnifiedCanvas = ({ hoverLeft, hoverRight }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    let animationFrameId
    let particles = []
    const friction = 0.94
    const spring = 0.003
    const particleSpacing = 6 
    const dotRadius = 1.5 // Matched with Hero section

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = canvas.parentElement.clientHeight
      initParticles()
    }

    const initParticles = () => {
      const w = canvas.width
      const h = canvas.height
      const off = document.createElement('canvas')
      off.width = w
      off.height = h
      const octx = off.getContext('2d', { willReadFrequently: true })

      // Define target zones based on mobile/desktop
      const isMobile = w < 768
      const cxLeft = isMobile ? w / 2 : w * 0.25
      const cxRight = isMobile ? w / 2 : w * 0.75
      const cyLeft = isMobile ? h * 0.25 : h / 2
      const cyRight = isMobile ? h * 0.75 : h / 2

      // Draw Shape 1: Code (Left)
      octx.clearRect(0, 0, w, h)
      const fontSize = Math.min(w, h) * (isMobile ? 0.25 : 0.4)
      octx.font = `300 ${fontSize}px system-ui, sans-serif`
      octx.textBaseline = 'middle'
      octx.textAlign = 'center'
      octx.fillText('< / >', cxLeft, cyLeft)
      const dataLeft = octx.getImageData(0, 0, w, h).data

      // Draw Shape 2: Honeycomb (Right)
      octx.clearRect(0, 0, w, h)
      const hexR = Math.min(w, h) * (isMobile ? 0.025 : 0.04)
      const hexW = Math.sqrt(3) * hexR
      const hexH = 2 * hexR
      const ySpacing = hexH * 0.75
      octx.lineWidth = 4
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

      const newParticles = []
      // Sample both zones
      for (let y = 0; y < h; y += particleSpacing) {
        for (let x = 0; x < w; x += particleSpacing) {
          const isL = dataLeft[(y * w + x) * 4 + 3] > 128
          const isR = dataRight[(y * w + x) * 4 + 3] > 128
          
          if (isL || isR) {
            newParticles.push({
              x: Math.random() * w,
              y: Math.random() * h,
              baseX: Math.random() * w,
              baseY: Math.random() * h,
              targetX: x,
              targetY: y,
              vx: 0, vy: 0,
              isLeft: isL,
              randomWander: Math.random() * 100
            })
          }
        }
      }
      particles = newParticles
    }

    window.addEventListener('resize', resize)
    resize()

    let time = 0
    const render = () => {
      time += 0.015 // Significantly slowed for a graceful 'Gemini' drift
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        let tx = p.baseX
        let ty = p.baseY

        const active = (p.isLeft && hoverLeft) || (!p.isLeft && hoverRight)
        if (active) {
          tx = p.targetX
          ty = p.targetY
          ctx.fillStyle = 'rgba(46, 84, 150, 0.9)'
        } else {
          ctx.fillStyle = 'rgba(100, 120, 150, 0.6)'
        }

        // Swarm / Join effect: Particles always move organicially
        tx += Math.sin(time + p.randomWander) * 4
        ty += Math.cos(time + p.randomWander) * 4

        p.vx += (tx - p.x) * spring
        p.vy += (ty - p.y) * spring
        p.vx *= friction
        p.vy *= friction
        p.x += p.vx
        p.y += p.vy

        ctx.beginPath()
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2)
        ctx.fill()
      }
      animationFrameId = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [hoverLeft, hoverRight])

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
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>For developers</h2>
            <p style={{ fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', fontWeight: 300, color: 'var(--text-secondary)', marginBottom: 32 }}>Achieve new heights</p>
            <Link href="/download" className="btn-primary" style={{ borderRadius: 100 }}>Download</Link>
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
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>For organizations</h2>
            <p style={{ fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', fontWeight: 300, color: 'var(--text-secondary)', marginBottom: 32 }}>Level up your entire team</p>
            <Link href="/notify" className="btn-outline" style={{ borderRadius: 100, background: 'var(--bg)' }}>Notify me</Link>
          </div>
        </div>
      </div>
    </section>
  )
}