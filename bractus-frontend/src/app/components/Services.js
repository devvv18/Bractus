'use client'
import { useState } from 'react'

const SERVICES = [
  {
    icon: '🧭',
    title: 'Advisory',
    subtitle: 'Strategy & Consulting',
    desc: 'Fractional CTO leadership that understands how AI changes the build-vs-buy equation for your business.',
    link: 'Learn More →',
  },
  {
    icon: '⚡',
    title: 'Development',
    subtitle: 'Application Development',
    desc: 'Software your customers rely on — built by experienced engineers directing AI agents through every stage.',
    link: 'Learn More →',
  },
  {
    icon: '🚀',
    title: 'DevOps',
    subtitle: 'DevOps & Performance',
    desc: 'Cloud infrastructure and CI/CD pipelines designed for speed — with AI-augmented automation that cuts deployment time.',
    link: 'Learn More →',
  },
  {
    icon: '🤖',
    title: 'Data Science',
    subtitle: 'Data & Analytics',
    desc: 'Data engineering and analytics powered by experienced analysts and AI agents that surface insights humans alone would miss.',
    link: 'Learn More →',
  },
]

export default function Services() {
  return (
    <section id="services" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span className="tag" style={{ marginBottom: 16 }}>OUR SERVICES</span>
        </div>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800, marginBottom: 16,
        }}>
          Modernize your <span className="accent-text">operation</span>
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: 'clamp(0.95rem, 1.8vw, 1.08rem)',
          maxWidth: 600, margin: '0 auto 56px',
          lineHeight: 1.7,
        }}>
          Our team embeds with yours to modernize your technology — directing AI agents
          to accelerate every phase of delivery. You get experienced professionals,
          smarter tooling, and real cost savings.
        </p>

        {/* Service cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 20,
        }}>
          {SERVICES.map(({ icon, title, subtitle, desc, link }) => (
            <ServiceCard key={title} icon={icon} title={title} subtitle={subtitle} desc={desc} link={link} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a href="#contact" className="btn-primary">Schedule a call →</a>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ icon, title, subtitle, desc, link }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="card" style={{
      cursor: 'pointer',
      borderColor: hovered ? 'var(--accent)' : 'var(--border)',
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 10,
        background: 'var(--accent-light)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, marginBottom: 20,
      }}>{icon}</div>
      <div style={{
        fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent)',
        textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6,
      }}>{title}</div>
      <h3 style={{
        fontFamily: 'Montserrat, sans-serif', fontSize: '1.15rem',
        fontWeight: 700, marginBottom: 12,
      }}>{subtitle}</h3>
      <p style={{
        fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 20,
      }}>{desc}</p>
      <span style={{
        fontSize: '0.88rem', fontWeight: 600,
        color: hovered ? 'var(--accent)' : 'var(--text-muted)',
        transition: 'color 0.2s',
      }}>{link}</span>
    </div>
  )
}