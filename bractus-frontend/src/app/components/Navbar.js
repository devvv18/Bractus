'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from '../context/ThemeContext'
import Logo from './Logo'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
  { label: 'About', href: '/about' },
  // { label: 'Case Studies', href: '/case-studies' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const contactEmail = process?.env?.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@bractus.com';
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
        <div style={{ flex: '1 1 0%', display: 'flex', justifyContent: 'flex-start', minWidth: 0 }}>
          <Logo />
        </div>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 32, justifyContent: 'center' }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} style={{
              color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 400,
              transition: 'color 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={e => e.target.style.color = 'var(--accent)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >{label}</Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ flex: '1 1 0%', display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'flex-end' }}>
          <a href={`mailto:${contactEmail}?subject=Schedule%20a%20Call%20with%20Bractus&body=Hello%20Bractus%20Team%2C%0A%0AI%20would%20like%20to%20schedule%20a%20call%20to%20discuss%20how%20your%20technology%20services%20can%20help%20my%20organization.%0A%0ALooking%20forward%20to%20hearing%20from%20you%21`} className="btn-primary btn-sm hide-mobile" style={{ fontSize: '0.82rem', padding: '10px 22px', whiteSpace: 'nowrap' }}>Schedule a call</a>
          
          <button onClick={toggle} className="theme-toggle-btn" aria-label="Toggle theme" title="Toggle Theme">
            {theme === 'light' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            )}
          </button>

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
          <a href={`mailto:${contactEmail}?subject=Schedule%20a%20Call%20with%20Bractus&body=Hello%20Bractus%20Team%2C%0A%0AI%20would%20like%20to%20schedule%20a%20call%20to%20discuss%20how%20your%20technology%20services%20can%20help%20my%20organization.%0A%0ALooking%20forward%20to%20hearing%20from%20you%21`} className="btn-primary" style={{ marginTop: 24, textAlign: 'center' }} onClick={() => setMobileOpen(false)}>
            Schedule a call
          </a>
        </div>
      )}
    </>
  )
}