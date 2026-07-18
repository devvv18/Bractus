'use client'
import Link from 'next/link'

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: 'Websites & Applications',
    items: ['Custom Web Platforms', 'Mobile Application Development', 'UI/UX Design & Prototyping', 'API Design & Integration'],
    href: '/services/websites-applications',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'Full-Stack Engineering',
    items: ['End-to-End System Development', 'Microservices Architecture', 'Legacy System Modernization', 'Quality Assurance & Automated Testing'],
    href: '/services/full-stack-engineering',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'System Architecture (Advisory)',
    items: ['Fractional CTO Services', 'Technical Due Diligence', 'Infrastructure Audits & Cost Optimization', 'Scalability & Security Planning'],
    href: '/services/system-architecture',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    title: 'AI & Machine Learning',
    items: ['AI Strategy & Implementation', 'Custom LLMs & Generative AI', 'Intelligent Chatbots & Agents', 'Predictive Logic Models'],
    href: '/services/ai-machine-learning',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    ),
    title: 'Cloud & DevOps',
    items: ['Cloud Infrastructure Design', 'CI/CD Pipeline Automation', 'Cloud Migration & Deployment', 'System Monitoring & Performance Tuning'],
    href: '/services/cloud-devops',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: 'Data Engineering',
    items: ['Data Pipeline Architecture', 'Database Migration & Management', 'Data Governance & Security', 'Analytics Platform Implementation'],
    href: '/services/data-engineering',
  },
]

function ServiceColumn({ icon, title, items, href }) {
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

      {/* Title */}
      <h3 style={{
        fontSize: '1.05rem',
        fontWeight: 700,
        color: 'var(--text)',
        lineHeight: 1.3,
        marginBottom: 20,
        fontFamily: 'Poppins, sans-serif'
      }}>
        {title}
      </h3>

      {/* Sub items as bullets */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>•</span>
            <span style={{
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              fontFamily: 'Poppins, sans-serif'
            }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ServicesPage() {
  const contactEmail = process?.env?.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@bractus.com';
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      <section style={{ paddingTop: 120, paddingBottom: 100 }}>
        <div className="container">

          {/* Top divider removed as requested */}
          {/* <div style={{ height: 1, background: 'var(--border)', marginBottom: 56 }} /> */}

          {/* 3-column grid for 6 blocks */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '64px 40px',
          }}>
            {SERVICES.map((s, i) => (
              <ServiceColumn key={i} {...s} />
            ))}
          </div>

          {/* Bottom divider remains */}
          <div style={{ height: 1, background: 'var(--border)', marginTop: 80 }} />

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: 24 }}>
              Not sure where to start? Let's talk about your goals.
            </p>
            <a href={`mailto:${contactEmail}?subject=Schedule%20a%20Call%20with%20Bractus&body=Hello%20Bractus%20Team%2C%0A%0AI%20would%20like%20to%20schedule%20a%20call%20to%20discuss%20how%20your%20technology%20services%20can%20help%20my%20organization.%0A%0ALooking%20forward%20to%20hearing%20from%20you%21`} className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem', borderRadius: 100 }}>
              Schedule a call
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}