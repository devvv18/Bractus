'use client'
import { useState } from 'react'
import Link from 'next/link'

const VALUES = [
  {
    letter: 'B',
    title: 'Builders First',
    desc: "We aren't just consultants; we are hands-on engineers. We challenge technical assumptions and build robust solutions to your most complex problems.",
  },
  {
    letter: 'R',
    title: 'Results-Driven',
    desc: "Your business objectives dictate our architecture. We focus strictly on deploying scalable systems that deliver a measurable return on your investment.",
  },
  {
    letter: 'A',
    title: 'Absolute Accountability',
    desc: "We take complete technical ownership of your project. You get one dedicated team, clear responsibilities, and reliable, on-time delivery.",
  },
  {
    letter: 'C',
    title: 'Craftsmanship',
    desc: "We don't settle for \"good enough.\" We take immense pride in writing clean, secure, and highly performant code designed for long-term scalability.",
  },
  {
    letter: 'T',
    title: 'Total Transparency',
    desc: "No black boxes or hidden technical debt. You get honest reporting, direct access to the developers, and complete visibility into every sprint.",
  },
  {
    letter: 'U',
    title: 'Uncompromising Quality',
    desc: "Security and performance are never afterthoughts. We adhere to the highest enterprise standards from the very first line of code we write.",
  },
  {
    letter: 'S',
    title: 'Scalable By Design',
    desc: "We don't just build for today. We architect future-proof cloud environments and data pipelines that grow seamlessly alongside your ambitions.",
  },
]

const DIFFERENTIATORS = [
  {
    title: 'Direct Access to Senior Talent',
    desc: "You won't get passed down to junior account managers. A senior engineer or technical architect partners with you directly, taking absolute ownership of system design, client communication, and code quality from day one.",
  },
  {
    title: 'Tangible Deliverables',
    desc: "We don't hide behind slide decks or theoretical roadmaps. Every phase of our engagement is designed to produce concrete, measurable results, whether it is rigorously tested code, deployed cloud infrastructure, or a fully shipped application.",
  },
  {
    title: 'Accelerated Execution',
    desc: "We combine deep, foundational engineering expertise with cutting-edge toolchains. By integrating intelligent automation and modern DevOps practices into our workflow, we deliver secure, enterprise-grade systems faster and more cost-effectively without ever sacrificing quality.",
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
              Engineering <span className="accent-text">excellence</span>, rooted in <span className="accent-text">integrity</span>.
            </h2>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '48px 32px',
            textAlign: 'center',
            marginBottom: 64,
            maxWidth: 1100,
            margin: '0 auto 64px'
          }}>
            {VALUES.map(({ letter, title, desc }) => (
              <div key={letter} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: 16,
                width: 'calc(20% - 32px)',
                minWidth: 180,
                flexGrow: 0
              }}>
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
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', fontFamily: 'Nunito, sans-serif' }}>{title}</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>

          <p style={{
            textAlign: 'center',
            fontSize: '1rem', color: 'var(--text-secondary)',
            maxWidth: 750, margin: '0 auto', lineHeight: 1.75,
          }}>
            At Bractus, we don't just write code, we act as a seamless extension of your organization.
            From strategic blueprinting to final execution, we deliver the comprehensive technical firepower required to future-proof your enterprise.
          </p>
        </div>
      </section>

      {/* ── 2. BEYOND TRADITIONAL OUTSOURCING ── */}
      <section style={{ background: 'var(--accent)', paddingTop: 80, paddingBottom: 80 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 400, color: '#fff',
            marginBottom: 24, lineHeight: 1.3,
          }}>
            Beyond Traditional Outsourcing
          </h2>
          <p style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: 820, margin: '0 auto 64px', lineHeight: 1.8,
          }}>
            Bractus was built on a straightforward premise: dedicated, outcome-focused teams consistently outperform traditional outsourcing models. While our commitment to engineering quality remains unchanged, our capabilities have scaled. Today, we deliver the comprehensive technical firepower required to handle your most complex digital transformations.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '32px 48px',
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

    </main>
  )
}