'use client'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

const CanvasParticles = ({ shape, isHovered }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    let animationFrameId
    let particles = []

    // Physics configuration for an overdamped, majestic transition
    const friction = 0.92 // Mathematically overdamped to guarantee NO bouncing
    const spring = 0.0015 // Slightly increased tension to speed up the transition just a little bit
    const particleSpacing = 6 // Dot density

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth
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

      octx.clearRect(0, 0, w, h)

      if (shape === 'code') {
        const cx = w / 2, cy = h / 2
        const fontSize = Math.min(w, h) * 0.5
        octx.font = `300 ${fontSize}px system-ui, -apple-system, sans-serif`
        octx.fillStyle = 'black'
        octx.textBaseline = 'middle'
        octx.textAlign = 'center'

        const gap = fontSize * 0.65
        octx.fillText('<', cx - gap, cy)
        octx.fillText('/', cx, cy)
        octx.fillText('>', cx + gap, cy)

      } else if (shape === 'honeycomb') {
        const hexR = Math.min(w, h) * 0.05
        const cols = 9
        const rows = 9
        const hexW = Math.sqrt(3) * hexR
        const hexH = 2 * hexR
        const ySpacing = hexH * 0.75

        const startX = w / 2 - ((cols - 1) * hexW) / 2
        const startY = h / 2 - ((rows - 1) * ySpacing) / 2

        octx.lineWidth = 4
        octx.lineJoin = 'round'
        octx.strokeStyle = 'black'

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const distFromCenter = Math.sqrt(Math.pow(r - 4, 2) + Math.pow(c - 4, 2))
            if (distFromCenter > 4.2) continue

            let hx = startX + c * hexW
            let hy = startY + r * ySpacing
            if (r % 2 === 1) hx += hexW / 2

            octx.beginPath()
            for (let edge = 0; edge <= 6; edge++) {
              const a = (Math.PI / 3) * edge - Math.PI / 6
              const px = hx + hexR * Math.cos(a)
              const py = hy + hexR * Math.sin(a)
              if (edge === 0) octx.moveTo(px, py)
              else octx.lineTo(px, py)
            }
            octx.stroke()
          }
        }
      }

      const imgData = octx.getImageData(0, 0, w, h).data
      const newParticles = []

      for (let y = 0; y < h; y += particleSpacing) {
        for (let x = 0; x < w; x += particleSpacing) {
          if (imgData[(y * w + x) * 4 + 3] > 50) {
            // Target coordinates
            const targetX = x
            const targetY = y

            // Random ambient starting position spread across the screen
            const baseX = Math.random() * w
            const baseY = Math.random() * h

            newParticles.push({
              x: baseX,
              y: baseY,
              baseX: baseX,
              baseY: baseY,
              targetX: targetX,
              targetY: targetY,
              vx: 0,
              vy: 0,
              radius: Math.random() * 1.5 + 1.0,
              randomWander: Math.random() * 100
            })
          }
        }
      }

      particles = newParticles
    }

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 }
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    canvas.addEventListener('mousemove', handleMouseMove)

    window.addEventListener('resize', resize)
    resize()

    let time = 0
    const render = () => {
      time += 0.02 // Slowed down time for smoother ambient drift
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = 'rgba(100, 120, 150, 0.8)' // Idle color
      if (isHovered) {
        ctx.fillStyle = 'rgba(46, 84, 150, 0.9)' // Active blue color
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        let tx = p.baseX
        let ty = p.baseY

        if (isHovered) {
          tx = p.targetX
          ty = p.targetY
        }

        // Add subtle, buttery organic floating effect
        tx += Math.sin(time + p.randomWander) * 1.5
        ty += Math.cos(time + p.randomWander) * 1.5

        // Physics update
        const dx = tx - p.x
        const dy = ty - p.y
        p.vx += dx * spring
        p.vy += dy * spring
        p.vx *= friction
        p.vy *= friction

        p.x += p.vx
        p.y += p.vy

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [shape, isHovered])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'auto'
      }}
    />
  )
}

export default function DualCards() {
  const [hoverLeft, setHoverLeft] = useState(false)
  const [hoverRight, setHoverRight] = useState(false)

  return (
    <section style={{ background: 'var(--bg)', padding: 0, position: 'relative' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: '85vh' }}>

        {/* ─── Left: For developers ─── */}
        <div
          style={{ flex: 1, minWidth: 320, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(60px,8vw,100px) clamp(24px,4vw,48px)', overflow: 'hidden' }}
          onMouseEnter={() => setHoverLeft(true)}
          onMouseLeave={() => setHoverLeft(false)}
        >
          {/* Fluid 2D Canvas Engine */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <CanvasParticles shape="code" isHovered={hoverLeft} />
          </div>

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', pointerEvents: 'none' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.2, marginBottom: 4 }}>For developers</h2>
            <p style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.2, marginBottom: 32 }}>Achieve new heights</p>
            <Link href="/download" className="btn-primary" style={{ padding: '14px 36px', fontSize: '1rem', borderRadius: 100, pointerEvents: 'auto' }}>Download</Link>
          </div>
        </div>

        {/* ─── Right: For organizations ─── */}
        <div
          style={{ flex: 1, minWidth: 320, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(60px,8vw,100px) clamp(24px,4vw,48px)', overflow: 'hidden' }}
          onMouseEnter={() => setHoverRight(true)}
          onMouseLeave={() => setHoverRight(false)}
        >
          {/* Fluid 2D Canvas Engine */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <CanvasParticles shape="honeycomb" isHovered={hoverRight} />
          </div>

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', pointerEvents: 'none' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.2, marginBottom: 4 }}>For organizations</h2>
            <p style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.2, marginBottom: 32 }}>Level up your entire team</p>
            <Link href="/notify" className="btn-outline" style={{ padding: '14px 36px', fontSize: '1rem', borderRadius: 100, background: 'var(--bg)', pointerEvents: 'auto' }}>Notify me</Link>
          </div>
        </div>

      </div>
    </section>
  )
}