'use client'
import Link from 'next/link'

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
    ),
    category: 'Advisory',
    title: 'Strategy & Consulting',
    items: ['Product Management', 'Fractional CTO Services', 'Technical Due Diligence', 'Cost Optimization'],
    href: '/services/advisory',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    category: 'Development',
    title: 'Application Development',
    items: ['Mobile App Development', 'Web Application Development', 'UI/UX Design & Development'],
    href: '/services/development',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    ),
    category: 'DevOps',
    title: 'DevOps & Performance',
    items: ['DevOps Implementation', 'Performance Optimization', 'Monitoring & Alerting Systems', 'Quality Assurance & Testing'],
    href: '/services/devops',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    category: 'Data Science',
    title: 'Data & Analytics',
    items: ['Data Management & Governance', 'Analytics & Platform Implementation', 'Machine Learning & AI'],
    href: '/services/data-science',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8v4l3 3"/><circle cx="18" cy="6" r="3"/>
      </svg>
    ),
    category: 'Artificial Intelligence',
    title: 'AI & Machine Learning',
    items: ['AI Strategy & Implementation', 'ChatBot Development', 'Generative AI', 'Machine Learning'],
    href: '/services/ai',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    category: 'Cloud',
    title: 'Cloud Infrastructure',
    items: ['Cloud Infrastructure Design', 'Cloud Migration Services'],
    href: '/services/cloud',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    category: 'Modernization',
    title: 'Application Modernization & Migration',
    items: ['Cloud Migration Services', 'Microservices Architecture', 'Integration Solutions'],
    href: '/services/modernization',
  },
]

function ServiceColumn({ icon, category, title, items, href }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Icon */}
      <div style={{
        width: 48, height: 48,
        borderRadius: 10,
        background: 'var(--accent-light)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent)',
        marginBottom: 16,
      }}>
        {icon}
      </div>

      {/* Category + Title */}
      <Link href={href} style={{ textDecoration: 'none' }}>
        <h3 style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--text)',
          lineHeight: 1.3,
          marginBottom: 20,
          cursor: 'pointer',
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
        >
          {title}
        </h3>
      </Link>

      {/* Sub items */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item, i) => (
          <li key={i}>
            <Link href={href} style={{
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              display: 'block',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Services Grid — Particle41 style flat columns */}
      <section style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="container">

          {/* Top divider */}
          <div style={{ height: 1, background: 'var(--border)', marginBottom: 56 }} />

          {/* 4-column grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '48px 40px',
          }}>
            {SERVICES.map((s, i) => (
              <ServiceColumn key={i} {...s} />
            ))}
          </div>

          {/* Bottom divider */}
          <div style={{ height: 1, background: 'var(--border)', marginTop: 64 }} />

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: 24 }}>
              Not sure where to start? Let's talk about your goals.
            </p>
            <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}?subject=Schedule%20a%20Call%20with%20Bractus&body=Hello%20Bractus%20Team%2C%0A%0AI%20would%20like%20to%20schedule%20a%20call%20to%20discuss%20how%20your%20technology%20services%20can%20help%20my%20organization.%0A%0ALooking%20forward%20to%20hearing%20from%20you%21`} className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem', borderRadius: 100 }}>
              Schedule a call
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}