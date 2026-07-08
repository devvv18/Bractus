'use client'
import { useEffect, useRef, useState } from 'react'

// Approx length of the closed outer path
const PATH_LEN = 4800

// Speed curve for progress bar
function getSpeed(p) {
  if (p < 15) return 4.0
  if (p < 50) return 2.2
  if (p < 80) return 1.0
  if (p < 95) return 0.4
  return 0.15
}

export default function Loader({ onFinish }) {
  const [pct, setPct] = useState(0)
  // Phases: 'bar' → 'collapse' → 'draw' → 'zoom' → 'out'
  const [phase, setPhase] = useState('bar')
  const [logoP, setLogoP] = useState(0)     // Stroke draw progress (0→1)

  const pctRef = useRef(0)
  const logoRef = useRef(0)

  // ── Phase 1: progress bar fills 0→100 ────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      pctRef.current = Math.min(pctRef.current + getSpeed(pctRef.current), 100)
      setPct(Math.floor(pctRef.current))
      if (pctRef.current >= 100) {
        clearInterval(id)
        setTimeout(() => setPhase('collapse'), 150)
        setTimeout(() => setPhase('draw'), 550)
      }
    }, 20)
    return () => clearInterval(id)
  }, [])

  // ── Phase 2: draw logo outline ───────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'draw') return
    const id = setInterval(() => {
      logoRef.current = Math.min(logoRef.current + 0.02, 1)
      setLogoP(logoRef.current)
      if (logoRef.current >= 1) {
        clearInterval(id)
        setPhase('zoom')
        // Call onFinish immediately as zoom starts — homepage fades in behind the zoom
        setTimeout(() => onFinish?.(), 200)
        setTimeout(() => setPhase('out'), 800)
      }
    }, 16)
    return () => clearInterval(id)
  }, [phase, onFinish])

  // Derived values
  const strokeOffset = PATH_LEN * (1 - logoP)
  const counter = String(pct).padStart(3, '0')

  // ── Theme-based CSS variables ───────────────────────────────────────────
  const bgColor = 'var(--bg)'
  const textColor = 'var(--text)'
  const labelColor = 'var(--text-muted)'
  const emptyTrackBg = 'var(--accent-light)'
  const dotColor = 'var(--accent-light)'

  // ── Bar styling ──────────────────────────────────────────────────────────
  const barStyle = (() => {
    if (phase === 'bar') {
      return { opacity: 1, transform: 'scaleX(1) scaleY(1)', transition: 'none' }
    }
    if (phase === 'collapse') {
      return {
        opacity: 1,
        transform: 'scaleX(0.01) scaleY(2.2)',
        transition: 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.38s ease',
      }
    }
    return { opacity: 0, transform: 'scaleX(0) scaleY(0)', transition: 'opacity 0.15s ease' }
  })()

  // ── Logo styling ─────────────────────────────────────────────────────────
  const logoStyle = (() => {
    if (phase === 'draw') {
      return {
        opacity: 1,
        transform: 'scale(1)',
        transition: 'opacity 0.2s ease',
      }
    }
    if (phase === 'zoom') {
      return {
        opacity: 1,
        // Scale highly to cover the entire screen
        transform: 'scale(42)',
        transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
      }
    }
    if (phase === 'out') {
      return {
        opacity: 0,
        transform: 'scale(48)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }
    }
    return { opacity: 0, transform: 'scale(0.8)', transition: 'none' }
  })()

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: bgColor,
      backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
      backgroundSize: '28px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: phase === 'out' ? 0 : 1,
      transition: phase === 'out' ? 'opacity 0.5s ease' : 'none',
      pointerEvents: 'all',
    }}>

      {/* ── Progress Bar (exact logo thickness & color) ────────────────────── */}
      <div style={{
        position: 'absolute',
        width: 280,
        height: 24,
        borderRadius: 12,
        background: emptyTrackBg,
        overflow: 'hidden',
        transformOrigin: 'center center',
        ...barStyle,
      }}>
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: `${pct}%`,
          // Exact brand logo gradient (left-to-right)
          background: 'linear-gradient(90deg, #109D70, #0A6781)',
          borderRadius: 12,
          transition: 'width 0.06s linear',
          boxShadow: '0 0 20px rgba(16, 157, 112, 0.4)',
        }} />
      </div>

      {/* ── Exact Bractus Logo (New Brand SVG path) ─────────────────────────── */}
      <svg
        width="460"
        height="460"
        viewBox="0 0 1080 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          overflow: 'visible',
          transformOrigin: 'center center',
          ...logoStyle,
        }}
      >
        <defs>
          <linearGradient
            id="logoGrad"
            x1="350.99"
            y1="540"
            x2="729.01"
            y2="540"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#078462" />
            <stop offset="1" stopColor="#013f4a" />
          </linearGradient>

          {/* Glowing outline effect */}
          <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M724.65,457.58c10.36-30.59,1.82-64.68-21.8-86.64-6.01-5.59-12.54-9.55-19.7-13.69l-91.38-52.71-76.03-43.74-71.11-40.83c-16.27-9.34-36.91-8.06-53.85-1.57-22.22,9.4-37.49,29.6-39.79,53.58v129c.01,19.59,7.84,37.69,20.8,51.8,6.29,6.85,13.14,11.79,21.16,16.43l64.68,37.41,56.4,32.53c1.87,1.08,2.55,3.57,2.46,5.34-.1,1.98-1.39,3.62-3.32,4.69l-38.37,21.32-33.47,18.61-52.19,29.46c-20.56,11.61-38.06,37.53-38.07,60.94l-.03,117.16c0,10.23,2.99,19.67,7.4,28.66,14.24,29.04,46.09,46.13,78.21,40.26,4.88-.89,9.32-2.44,13.64-4.7l12.05-6.33,123.86-65.38,99.68-54.03c28.19-15.28,44.2-48.44,43.08-80.34-.59-16.74-5.71-32.74-15.39-46.3-7.09-9.93-16.42-17.19-26.73-23.5-8.59-5.25-16.68-10.71-24.41-17.05-6.27-5.14-10.49-12.07-11.99-19.98-2.19-11.51,2.93-22.95,12.59-29.26l29.55-19.3c15.26-9.97,26.26-24.65,32.08-41.84ZM672.72,450.08l-29.59,20.48c-34.52,23.88-50.41,71.48-26.88,108.83,4.7,7.46,9.92,14.24,16.77,19.74l17.48,14.01,17.71,13.25c10.92,8.73,16.7,21.57,15.67,35.45-.92,12.54-6.79,23.56-16.8,31.19l-12.19,7.51-73.93,39.99-52.3,28.08-95.82,51.02c-8.41,4.48-19.01,2.08-25.92-3.95-6.28-5.47-9.93-13.24-9.94-21.76l-.09-106.18c0-8.1,1.83-15.14,6.43-21.75,3.62-5.19,8.4-9.31,13.96-12.45l15.2-8.57,63.26-35.26,56.45-32.12c12.29-7.5,19.29-22.14,18.58-36.35-.72-14.15-8.78-26.83-20.83-33.82l-47.36-27.5-89.56-51.74c-9.13-7.07-15.99-17.08-15.99-28.98l-.1-118.5c0-5.96,2.25-11.22,6.39-15.48,5.82-6,16-7.96,23.77-3.45l86.54,50.16,92.86,53.78,51.38,29.58,11.08,7.26c6.62,5.19,11.51,11.89,13.64,20.07,2.73,10.52-.8,21.16-9.87,27.44Z"
          fill="url(#logoGrad)"
          fillOpacity={logoP}
          stroke="url(#logoGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={PATH_LEN}
          strokeDashoffset={strokeOffset}
          filter="url(#logoGlow)"
          style={{ transition: 'fill-opacity 0.1s linear' }}
        />
      </svg>

      {/* ── Bottom-left counter (Lusion style) ─────────────────────────────── */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        bottom: '5.5vh',
        left: '5.5vw',
        fontFamily: "'Inter', -apple-system, sans-serif",
        fontSize: 'clamp(4.5rem, 9vw, 7.5rem)',
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: '-0.04em',
        color: '#078462',
        userSelect: 'none',
        pointerEvents: 'none',
        opacity: phase === 'out' ? 0 : 1,
        transition: phase === 'out' ? 'opacity 0.4s ease' : 'none',
      }}>
        {counter}
      </div>

      {/* ── Top-right label ────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        top: '5.5vh',
        right: '5.5vw',
        fontFamily: "'Inter', -apple-system, sans-serif",
        fontSize: '0.65rem',
        fontWeight: 500,
        letterSpacing: '0.22em',
        color: labelColor,
        textTransform: 'uppercase',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        Bractus
      </div>
    </div>
  )
}

