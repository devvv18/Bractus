'use client'
import { useState } from 'react'
import Link from 'next/link'

const CASE_STUDIES = [
  {
    tag: 'Cloud & Mobile',
    client: 'JMJ Cloud',
    title: 'Integrating mobile apps with Oracle ERP at enterprise scale',
    desc: 'JMJ Cloud needed mobile applications that could seamlessly talk to Oracle ERP systems. Bractus embedded a full delivery team and shipped production-ready integrations on time and on budget.',
    outcome: 'Improved client satisfaction across Fortune 500 accounts',
    href: '/case-studies/jmj-cloud',
  },
  {
    tag: 'Platform Development',
    client: 'Mumford Restoration',
    title: 'Building a production-ready platform that impressed the board',
    desc: 'Mumford Restoration needed a partner who could move fast without sacrificing quality. Bractus delivered a complete platform ahead of schedule — under budget.',
    outcome: 'Board-ready delivery in under projected timeline',
    href: '/case-studies/mumford-restoration',
  },
  {
    tag: 'Data & DevOps',
    client: 'Podium Audio',
    title: 'Transparent, accountable delivery for a publisher going digital',
    desc: 'Podium Audio required clear milestones and real deliverables at every stage. Bractus provided full visibility, zero hidden surprises, and great software.',
    outcome: 'On-time delivery with full milestone transparency',
    href: '/case-studies/podium-audio',
  },
]

function CaseStudyCard({ tag, client, title, desc, outcome, href }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--surface)',
        border: `1.5px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 16,
        padding: '36px 32px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        boxShadow: hovered ? 'var(--card-shadow-hover)' : 'var(--card-shadow)',
        cursor: 'pointer',
      }}
    >
      {/* Tag */}
      <span className="tag" style={{ marginBottom: 20, alignSelf: 'flex-start' }}>
        {tag}
      </span>

      {/* Client name */}
      <div style={{
        fontSize: '0.78rem',
        fontWeight: 600,
        color: 'var(--accent)',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        marginBottom: 10,
      }}>
        {client}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '1.15rem',
        fontWeight: 600,
        lineHeight: 1.4,
        marginBottom: 14,
        color: 'var(--text)',
      }}>
        {title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.7,
        marginBottom: 24,
        flexGrow: 1,
      }}>
        {desc}
      </p>

      {/* Outcome pill */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: 'var(--accent-light)',
        borderRadius: 8,
        padding: '8px 14px',
        marginBottom: 24,
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%',
          background: 'var(--accent)', flexShrink: 0,
        }} />
        <span style={{
          fontSize: '0.82rem',
          color: 'var(--accent)',
          fontWeight: 500,
        }}>
          {outcome}
        </span>
      </div>

      {/* Link */}
      <Link href={href} style={{
        fontSize: '0.9rem',
        fontWeight: 600,
        color: hovered ? 'var(--accent-hover)' : 'var(--accent)',
        transition: 'color 0.2s',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
      }}>
        Read case study <span>→</span>
      </Link>
    </div>
  )
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span className="tag">CASE STUDIES</span>
        </div>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 400,
          marginBottom: 16,
        }}>
          Real outcomes for <span className="accent-text">real clients</span>
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
          maxWidth: 580,
          margin: '0 auto 56px',
          lineHeight: 1.75,
        }}>
          See how we've helped growth-stage and mid-market companies
          solve their toughest technology challenges.
        </p>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 28,
        }}>
          {CASE_STUDIES.map((cs, i) => (
            <CaseStudyCard key={i} {...cs} />
          ))}
        </div>

      </div>
    </section>
  )
}