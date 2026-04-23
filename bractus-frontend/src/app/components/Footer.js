'use client'

const FOOTER_LINKS = {
  Services: [
    { label: 'Advisory', href: '#services' },
    { label: 'Development', href: '#services' },
    { label: 'DevOps', href: '#services' },
    { label: 'Data Science', href: '#services' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'FAQs', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
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
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8,
              background: '#2fa492',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Nunito, sans-serif', fontWeight: 400, fontSize: 16, color: '#fff',
            }}>B</div>
            <span style={{
              fontFamily: 'Nunito, sans-serif', fontWeight: 400,
              fontSize: '1.15rem', color: '#f1f5f9',
            }}>BRACTUS</span>
          </a>
          <p style={{
            color: '#64748b', fontSize: '0.85rem', lineHeight: 1.7,
            maxWidth: 280, marginBottom: 20,
          }}>
            We help growth-stage and mid-market companies solve their toughest
            technology challenges with AI-augmented delivery.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            {['𝕏', 'in', '○'].map((icon, i) => (
              <a key={i} href="#" style={{
                width: 36, height: 36, borderRadius: 8,
                border: '1px solid #334155',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#64748b', fontSize: '0.85rem', fontWeight: 400,
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#2fa492'; e.currentTarget.style.color = '#2fa492' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#64748b' }}
              >{icon}</a>
            ))}
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
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} style={{
                    color: '#94a3b8', fontSize: '0.88rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.color = '#2fa492'}
                  onMouseLeave={e => e.target.style.color = '#94a3b8'}
                  >{label}</a>
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
          © 2025 Bractus Inc. All rights reserved.
        </p>
        <p style={{ color: '#475569', fontSize: '0.8rem' }}>
          Made with ❤️ in India
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
