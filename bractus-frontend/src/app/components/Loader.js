'use client'
import { useEffect, useRef, useState } from 'react'

// Approx length of the closed outer path
const PATH_LEN = 2400

// Speed curve for progress bar
function getSpeed(p) {
  if (p < 15) return 4.0
  if (p < 50) return 2.2
  if (p < 80) return 1.0
  if (p < 95) return 0.4
  return 0.15
}

export default function Loader({ onFinish }) {
  const [pct, setPct]           = useState(0)
  // Phases: 'bar' → 'collapse' → 'draw' → 'zoom' → 'out'
  const [phase, setPhase]       = useState('bar')
  const [logoP, setLogoP]       = useState(0)     // Stroke draw progress (0→1)
  
  const pctRef  = useRef(0)
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
        // Transition to homepage occurs as the zoom reaches its peak
        setTimeout(() => {
          setPhase('out')
          setTimeout(() => onFinish?.(), 600)
        }, 700)
      }
    }, 16)
    return () => clearInterval(id)
  }, [phase, onFinish])

  // Derived values
  const strokeOffset = PATH_LEN * (1 - logoP)
  const counter      = String(pct).padStart(3, '0')

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

      {/* ── Exact Bractus Logo (M110 60 ... Z path) ─────────────────────────── */}
      <svg
        width="220"
        height="385"
        viewBox="0 0 400 700"
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
          {/* Exact Bractus brand logo gradient */}
          <linearGradient id="logoGrad" x1="110" y1="60" x2="300" y2="615" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#109D70" />
            <stop offset="100%" stopColor="#0A6781" />
          </linearGradient>

          {/* Glowing outline effect */}
          <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 
          The Bractus ribbon path is drawn as a stroke during 'draw' phase, 
          then scaled during 'zoom' phase to transition.
        */}
        <path
          d="M110 60 Q110 20 150 20 L300 105 Q365 145 365 210 Q365 260 330 285 Q290 315 290 360 Q290 400 330 430 Q365 455 365 510 Q365 575 300 615 L150 690 Q110 690 110 650 L110 510 Q110 470 145 450 L225 405 Q260 385 260 360 Q260 335 225 315 L145 270 Q110 250 110 210 Z"
          fill="none"
          stroke="url(#logoGrad)"
          strokeWidth="34"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={PATH_LEN}
          strokeDashoffset={strokeOffset}
          filter="url(#logoGlow)"
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
        color: textColor,
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

