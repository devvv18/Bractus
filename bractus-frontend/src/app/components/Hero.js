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

const STATS = [
  { end: 120, suffix: '+', label: 'Clients Served' },
  { end: 50,  suffix: '+', label: 'Projects Delivered' },
  { end: 98,  suffix: '%', label: 'Satisfaction Rate' },
  { end: 8,   suffix: '+', label: 'Years Experience' },
]

/** Scales hub/nodes/wires larger inside the same card without changing layout dimensions */
const GRAPH_SCALE = 1.18

function DataCentreAnimation({ counts }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const k = GRAPH_SCALE
    const curveX = 40 * k
    const curveY = 30 * k

    // Node positions — central hub + surrounding nodes
    const getNodes = () => {
      const w = canvas.width
      const h = canvas.height
      const cx = w * 0.42
      // Slightly below midline + larger graph fills space above stats (reduces dead gap)
      const cy = h * 0.53
      return {
        hub: { x: cx, y: cy, r: 18 * k },
        nodes: [
          { x: cx - w * 0.28 * k, y: cy - h * 0.28 * k, r: 9 * k, label: null },
          { x: cx + w * 0.22 * k, y: cy - h * 0.30 * k, r: 9 * k, label: null },
          { x: cx - w * 0.30 * k, y: cy + h * 0.22 * k, r: 9 * k, label: null },
          { x: cx + w * 0.20 * k, y: cy + h * 0.28 * k, r: 9 * k, label: null },
          { x: cx - w * 0.08 * k, y: cy - h * 0.38 * k, r: 6 * k, label: null },
          { x: cx + w * 0.30 * k, y: cy + h * 0.05 * k, r: 6 * k, label: null },
          { x: cx - w * 0.20 * k, y: cy + h * 0.05 * k, r: 6 * k, label: null },
          { x: cx + w * 0.08 * k, y: cy + h * 0.36 * k, r: 6 * k, label: null },
        ]
      }
    }

    // Packets travelling along wires
    const packets = []
    const initPackets = (nodes) => {
      packets.length = 0
      nodes.nodes.forEach((node, i) => {
        packets.push({
          fromHub: Math.random() > 0.5,
          t: Math.random(),
          speed: 0.003 + Math.random() * 0.004,
          nodeIdx: i,
          size: (3 + Math.random() * 2) * k,
        })
        packets.push({
          fromHub: Math.random() > 0.5,
          t: Math.random(),
          speed: 0.002 + Math.random() * 0.003,
          nodeIdx: i,
          size: (2 + Math.random() * 2) * k,
        })
      })
    }

    let scene = getNodes()
    initPackets(scene)

    const getAccent = () => {
      const s = getComputedStyle(document.documentElement)
      return s.getPropertyValue('--accent').trim() || '#2F5496'
    }

    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1,3),16)
      const g = parseInt(hex.slice(3,5),16)
      const b = parseInt(hex.slice(5,7),16)
      return `${r},${g},${b}`
    }

    let tick = 0
    const draw = () => {
      tick++
      const w = canvas.width
      const h = canvas.height
      const accent = getAccent()
      const rgb = hexToRgb(accent.length === 7 ? accent : '#2F5496')

      ctx.clearRect(0, 0, w, h)

      scene = getNodes()

      // Draw wires (cables)
      scene.nodes.forEach((node, i) => {
        const hub = scene.hub
        const cpx = (hub.x + node.x) / 2 + (i % 2 === 0 ? curveX : -curveX)
        const cpy = (hub.y + node.y) / 2 + (i % 3 === 0 ? -curveY : curveY)

        // Glow wire
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(hub.x, hub.y)
        ctx.quadraticCurveTo(cpx, cpy, node.x, node.y)
        ctx.strokeStyle = `rgba(${rgb}, 0.15)`
        ctx.lineWidth = 2 * k
        ctx.shadowColor = `rgba(${rgb}, 0.4)`
        ctx.shadowBlur = 8 * k
        ctx.stroke()
        ctx.restore()

        // Bright wire
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(hub.x, hub.y)
        ctx.quadraticCurveTo(cpx, cpy, node.x, node.y)
        ctx.strokeStyle = `rgba(${rgb}, 0.35)`
        ctx.lineWidth = 1 * k
        ctx.stroke()
        ctx.restore()
      })

      // Draw packets
      packets.forEach(pkt => {
        pkt.t += pkt.speed
        if (pkt.t > 1) pkt.t = 0

        const node = scene.nodes[pkt.nodeIdx]
        const hub = scene.hub
        const i = pkt.nodeIdx
        const cpx = (hub.x + node.x) / 2 + (i % 2 === 0 ? curveX : -curveX)
        const cpy = (hub.y + node.y) / 2 + (i % 3 === 0 ? -curveY : curveY)

        const t = pkt.fromHub ? pkt.t : 1 - pkt.t
        const mt = 1 - t
        const px = mt*mt*hub.x + 2*mt*t*cpx + t*t*node.x
        const py = mt*mt*hub.y + 2*mt*t*cpy + t*t*node.y

        ctx.save()
        ctx.beginPath()
        ctx.arc(px, py, pkt.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb}, 0.9)`
        ctx.shadowColor = accent
        ctx.shadowBlur = 12 * k
        ctx.fill()
        ctx.restore()
      })

      // Draw outer nodes
      scene.nodes.forEach((node) => {
        const pulse = Math.sin(tick * 0.04 + node.x) * 0.3 + 0.7

        ctx.save()
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r + 4 * k, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb}, ${0.08 * pulse})`
        ctx.fill()
        ctx.restore()

        ctx.save()
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb}, 0.2)`
        ctx.strokeStyle = `rgba(${rgb}, 0.7)`
        ctx.lineWidth = 1.5 * k
        ctx.shadowColor = accent
        ctx.shadowBlur = 10 * k
        ctx.fill()
        ctx.stroke()
        ctx.restore()
      })

      // Draw hub (data centre)
      const hubPulse = Math.sin(tick * 0.05) * 0.15 + 0.85
      // Outer glow ring
      ctx.save()
      ctx.beginPath()
      ctx.arc(scene.hub.x, scene.hub.y, scene.hub.r + (10 + Math.sin(tick*0.05)*4) * k, 0, Math.PI*2)
      ctx.strokeStyle = `rgba(${rgb}, ${0.25 * hubPulse})`
      ctx.lineWidth = 2 * k
      ctx.shadowColor = accent
      ctx.shadowBlur = 20 * k
      ctx.stroke()
      ctx.restore()

      // Hub body
      ctx.save()
      const grad = ctx.createRadialGradient(
        scene.hub.x - 4 * k, scene.hub.y - 4 * k, 2 * k,
        scene.hub.x, scene.hub.y, scene.hub.r
      )
      grad.addColorStop(0, `rgba(${rgb}, 0.9)`)
      grad.addColorStop(1, `rgba(${rgb}, 0.5)`)
      ctx.beginPath()
      ctx.arc(scene.hub.x, scene.hub.y, scene.hub.r, 0, Math.PI*2)
      ctx.fillStyle = grad
      ctx.shadowColor = accent
      ctx.shadowBlur = 30 * k
      ctx.fill()
      ctx.restore()

      // Server icon lines on hub
      ctx.save()
      ctx.strokeStyle = 'rgba(255,255,255,0.8)'
      ctx.lineWidth = 2 * k
      ctx.lineCap = 'round'
      const hx = scene.hub.x, hy = scene.hub.y
      const u = 7 * k
      const v = 6 * k
      const bw = 14 * k
      const bh = 4 * k
      ctx.strokeRect(hx - u, hy - v, bw, bh)
      ctx.strokeRect(hx - u, hy + 2 * k, bw, bh)
      ctx.restore()

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 480 }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      {/* Stats overlay on the animation */}
      <div style={{
        position: 'absolute', bottom: 24, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center',
        width: '90%',
      }}>
        {STATS.map(({ suffix, label }, i) => (
          <div key={label} style={{
            background: 'var(--accent)',
            borderRadius: 12,
            padding: '10px 18px',
            textAlign: 'center',
            minWidth: 90,
            boxShadow: '0 4px 20px rgba(47,84,150,0.3)',
          }}>
            <div style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
              fontWeight: 700, color: '#fff',
            }}>{counts[`c${i}`]}{suffix}</div>
            <div style={{
              fontSize: '0.68rem', color: 'rgba(255,255,255,0.75)',
              textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2,
            }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const contactEmail = process?.env?.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@bractus.com'
  const statsRef = useRef(null)
  const [counts, setCounts] = useState({ c0: 0, c1: 0, c2: 0, c3: 0 })
  const animated = useRef(false)

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
    }, { threshold: 0.3 })
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
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute',
        width: 500, height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
        top: '40%', left: '60%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        filter: 'blur(80px)',
        opacity: 0.5,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 72, paddingBottom: 72 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }}>

          {/* LEFT: Content */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* Tags */}
            <div className="anim-fade-up" style={{ marginBottom: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span className="tag">✦ COMPREHENSIVE IT SOLUTIONS</span>
              <span className="tag">✦ END-TO-END TECHNOLOGY PARTNER</span>
            </div>

            {/* Headline */}
            <h1 className="anim-fade-up anim-delay-1" style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: 24,
              textAlign: 'left',
            }}>
              We Build, Scale, and Modernize<br />
              <span className="accent-text">Complex Software Systems</span>
            </h1>

            {/* Subtext */}
            <p className="anim-fade-up anim-delay-2" style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              marginBottom: 28,
              textAlign: 'left',
            }}>
              Your all-in-one partner for digital transformation. Whether building
              standard web applications to advanced DevOps, data pipelines, or reshaping
              an outdated legacy system and architecting a cutting-edge AI platform from
              the ground up, our cross-functional teams deliver scalable, high-performance
              results.
            </p>

            {/* Badge row */}
            <div className="anim-fade-up anim-delay-2" style={{
              display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36,
            }}>
              {BADGES.map(b => (
                <span key={b} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '6px 14px', borderRadius: 100,
                  border: '1px solid var(--border)',
                  fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 400,
                }}>
                  <span style={{ color: 'var(--accent)', fontSize: 13 }}>✓</span>
                  {b}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="anim-fade-up anim-delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href={`mailto:${contactEmail}?subject=Schedule%20a%20Call%20with%20Bractus`}
                className="btn-primary"
              >
                Schedule a call
              </a>
              <a href="/services" className="btn-outline">View Our Services</a>
            </div>
          </div>

          {/* RIGHT: Animated Data Centre Visual */}
          <div ref={statsRef} className="anim-fade-up anim-delay-2" style={{
            position: 'relative',
            borderRadius: 24,
            overflow: 'hidden',
            background: 'var(--bg-alt)',
            border: '1px solid var(--border)',
            minHeight: 480,
            display: 'flex', alignItems: 'stretch',
          }}>
            <DataCentreAnimation counts={counts} />
          </div>

        </div>
      </div>
    </section>
  )
}