'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
  { label: 'About', href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px, 5vw, 80px)',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? 'var(--nav-shadow)' : 'none',
        transition: 'background 0.3s, box-shadow 0.3s',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Nunito, sans-serif', fontWeight: 400, fontSize: 18, color: '#fff',
          }}>B</div>
          <span style={{
            fontFamily: 'Nunito, sans-serif', fontWeight: 400,
            fontSize: '1.25rem', color: 'var(--text)', letterSpacing: '-0.02em',
          }}>BRACTUS</span>
        </Link>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} style={{
              color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 400,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--accent)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >{label}</Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={toggle} className="theme-toggle" aria-label="Toggle theme map" title="Toggle Theme"></button>
          <Link href="/#contact" className="btn-primary btn-sm hide-mobile">Schedule a call</Link>

          {/* Hamburger */}
          <button className="show-mobile" onClick={() => setMobileOpen(o => !o)}
            aria-label="Menu" style={{
              background: 'none', border: 'none', flexDirection: 'column', gap: 5, padding: 4,
            }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 2, borderRadius: 2,
                background: 'var(--text)',
                transition: 'all 0.3s',
                transform: mobileOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
                    : i === 1 ? 'scaleX(0)'
                    : 'rotate(-45deg) translate(5px,-5px)'
                  : 'none',
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 190,
          background: 'var(--bg)',
          display: 'flex', flexDirection: 'column',
          padding: '100px 32px 40px', gap: 4,
        }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} onClick={() => setMobileOpen(false)}
              style={{
                fontSize: '1.5rem', fontFamily: 'Nunito, sans-serif', fontWeight: 400,
                color: 'var(--text)', padding: '16px 0',
                borderBottom: '1px solid var(--border)',
              }}>{label}</Link>
          ))}
          <Link href="/#contact" onClick={() => setMobileOpen(false)}
            className="btn-primary" style={{ marginTop: 24, textAlign: 'center' }}>
            Schedule a call
          </Link>
        </div>
      )}
    </>
  )
}