'use client'
import Link from 'next/link'
import Logo from './Logo'

const FOOTER_LINKS = {
  Services: [
    { label: 'Web & Applications', href: '#services' },
    { label: 'Full-Stack Engineering', href: '#services' },
    { label: 'AI & Machine Learning', href: '#services' },
    { label: 'Cloud & DevOps', href: '#services' },
    { label: 'Data Engineering', href: '#services' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'FAQs', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--footer-bg)',
      padding: 'clamp(48px, 7vw, 80px) clamp(20px, 5vw, 80px) 32px',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '2fr repeat(3, 1fr)',
        gap: 40,
      }} className="footer-grid">
        {/* Brand col */}
        <div>
          <div style={{ marginBottom: 20 }}>
            <Logo variant="footer" />
          </div>
          <p style={{
            color: '#64748b', fontSize: '0.85rem', lineHeight: 1.7,
            maxWidth: 320, marginBottom: 24,
          }}>
            Your end-to-end technology partner. From reshaping legacy systems to engineering custom software and AI platforms from the ground up, we deliver technical excellence at scale.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            <a href={`mailto:info@bractus.com`} style={{ color: '#94a3b8', fontSize: '0.85rem', textDecoration: 'none' }}>info@bractus.com</a>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>+91 8766328987</span>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Delhi, India</span>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <a href="https://www.linkedin.com/company/bractus-innovations/" target="_blank" rel="noopener noreferrer" style={{
              width: 36, height: 36, borderRadius: 8,
              border: '1px solid #334155',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#64748b', fontSize: '0.85rem', fontWeight: 400,
              transition: 'border-color 0.2s, color 0.2s',
              textDecoration: 'none'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#64748b' }}
            >in</a>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([group, links]) => (
          <div key={group}>
            <h4 style={{
              fontSize: '0.72rem', fontWeight: 400, color: '#94a3b8',
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16,
              fontFamily: 'Nunito, sans-serif',
            }}>{group}</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, listStyle: 'none', padding: 0, margin: 0 }}>
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} style={{
                    color: '#94a3b8', fontSize: '0.88rem',
                    transition: 'color 0.2s',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = '#94a3b8'}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1200, margin: '48px auto 0',
        paddingTop: 20, borderTop: '1px solid #1e293b',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
      }}>
        <p style={{ color: '#475569', fontSize: '0.8rem' }}>
          © 2026 Bractus. All rights reserved.
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
