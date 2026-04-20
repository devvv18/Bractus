'use client'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      id="navbar"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(20px, 6vw, 96px)',
        background: scrolled
          ? 'rgba(8,9,13,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Logo */}
      <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          width: 34, height: 34,
          background: 'linear-gradient(135deg, #7c3aed, #60a5fa)',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 900, color: '#fff',
          boxShadow: '0 0 20px rgba(124,58,237,0.5)',
        }}>B</span>
        <span style={{ fontFamily: 'Syne, Inter, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#fff', letterSpacing: '-0.02em' }}>
          bractus
        </span>
      </a>

      {/* Desktop Links */}
      <ul style={{ display: 'flex', gap: 36, listStyle: 'none', alignItems: 'center' }} className="hidden md:flex">
        {['Services', 'About', 'Team', 'Contact'].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              style={{
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.01em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#a78bfa'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        className="btn-glow"
        style={{
          background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
          color: '#fff',
          padding: '9px 22px',
          borderRadius: 10,
          fontSize: '0.85rem',
          fontWeight: 600,
          textDecoration: 'none',
          border: '1px solid rgba(167,139,250,0.25)',
          boxShadow: '0 0 20px rgba(124,58,237,0.3)',
        }}
      >
        Get started →
      </a>
    </nav>
  )
}