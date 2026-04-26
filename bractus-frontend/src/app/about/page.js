'use client'
import { useState } from 'react'
import Link from 'next/link'

const VALUES = [
  {
    letter: 'B',
    title: 'Bold Thinking',
    desc: 'We challenge assumptions and push for smarter solutions every time.',
  },
  {
    letter: 'R',
    title: 'Results Driven',
    desc: 'Every decision we make is tied directly to outcomes that matter to you.',
  },
  {
    letter: 'A',
    title: 'Accountability',
    desc: 'We own the outcome — one team, clear ownership, no excuses.',
  },
  {
    letter: 'C',
    title: 'Craft',
    desc: 'We take pride in the quality of everything we build and ship.',
  },
  {
    letter: 'T',
    title: 'Transparency',
    desc: 'You always know exactly where your project stands and why.',
  },
]

const DIFFERENTIATORS = [
  {
    title: 'You get a professional, not a process.',
    desc: 'A senior engineer or strategist works with you directly — owning architecture decisions, client communication, and delivery quality from day one. You get accountability at the top, not just at the bottom.',
  },
  {
    title: 'Every output is working software.',
    desc: 'We do not deliver slide decks or status reports as milestones. Every phase of our engagement produces something concrete — tested code, deployed infrastructure, or shipped features.',
  },
  {
    title: 'We rebuilt delivery around AI from the ground up.',
    desc: 'AI is not an add-on to how we work — it is how we work. Our model was designed from scratch to pair experienced professionals with AI agents, giving you faster timelines and lower costs without sacrificing quality.',
  },
]

const TESTIMONIALS = [
  {
    quote: 'Bractus completely transformed our engineering culture. Their team embedded with us and shipped in half the timeline we expected.',
    name: 'Jamie Stokes',
    role: 'CEO, JMJ Cloud',
    initials: 'JS',
  },
  {
    quote: 'We needed a partner who could move fast without sacrificing quality. Bractus delivered a production-ready platform our board was genuinely impressed with.',
    name: 'Zach Mumford',
    role: 'General Manager, Mumford Restoration',
    initials: 'ZM',
  },
  {
    quote: 'The level of transparency and accountability exceeded everything we expected. No hidden surprises — just consistent, high-quality delivery.',
    name: 'Jon Oxidine',
    role: 'COO, Podium Audio',
    initials: 'JO',
  },
]

export default function AboutPage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── 1. CORE VALUES ── */}
      <section style={{ paddingTop: 120, paddingBottom: 80, background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="tag" style={{ marginBottom: 16 }}>OUR CORE VALUES</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 400, lineHeight: 1.3 }}>
              Bold. Results-driven. Accountable.<br />Crafted with Transparency.
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 24,
            textAlign: 'center',
          }}>
            {VALUES.map(({ letter, title, desc }) => (
              <div key={letter} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <div style={{ position: 'relative', width: 72, height: 72 }}>
                  <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                    <polygon
                      points="36,4 66,20 66,52 36,68 6,52 6,20"
                      stroke="var(--accent)"
                      strokeWidth="2"
                      fill="var(--accent-light)"
                    />
                  </svg>
                  <span style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '1.4rem', fontWeight: 700,
                    color: 'var(--accent)',
                  }}>{letter}</span>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>{title}</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>

          <p style={{
            textAlign: 'center',
            fontSize: '1rem', color: 'var(--text-secondary)',
            maxWidth: 700, margin: '56px auto 0', lineHeight: 1.75,
          }}>
            At Bractus, we embed <strong>senior professionals</strong> who integrate smoothly with your team.
            From strategy to execution,{' '}
            <Link href="/services" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
              we build modern, AI-augmented solutions
            </Link>{' '}
            for lasting business impact.
          </p>
        </div>
      </section>

      {/* ── 2. HOW WE'VE GROWN ── */}
      <section style={{ background: 'var(--accent)', paddingTop: 80, paddingBottom: 80 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 400, color: '#fff',
            marginBottom: 24, lineHeight: 1.3,
          }}>
            How We've Grown
          </h2>
          <p style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: 720, margin: '0 auto 64px', lineHeight: 1.8,
          }}>
            Bractus started with a straightforward belief: outcome-focused teams led by experienced
            professionals consistently outperform traditional outsourcing. That belief has not changed.
            What has changed is how powerfully we can now execute it.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0 48px',
            textAlign: 'left',
          }}>
            {DIFFERENTIATORS.map(({ title, desc }, i) => (
              <div key={i} style={{
                borderTop: '2px solid rgba(255,255,255,0.4)',
                paddingTop: 32,
              }}>
                <h3 style={{
                  fontSize: '1.1rem', fontWeight: 700,
                  color: '#fff', marginBottom: 14, lineHeight: 1.3,
                }}>{title}</h3>
                <p style={{
                  fontSize: '0.88rem',
                  color: 'rgba(255,255,255,0.78)',
                  lineHeight: 1.75,
                }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. TESTIMONIALS ── */}
      <section style={{ paddingTop: 100, paddingBottom: 120, background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="tag" style={{ marginBottom: 16 }}>TESTIMONIALS</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 400 }}>
              What our clients <span className="accent-text">say</span>
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
          }}>
            {TESTIMONIALS.map(({ quote, name, role, initials }) => (
              <div key={name} style={{
                background: 'var(--surface)',
                border: '1.5px solid var(--border)',
                borderRadius: 16, padding: 28,
              }}>
                <div style={{ fontSize: '1.5rem', color: 'var(--accent)', opacity: 0.5, marginBottom: 16 }}>❝</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>{quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0,
                  }}>{initials}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}