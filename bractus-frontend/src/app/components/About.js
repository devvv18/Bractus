'use client'
import { useState } from 'react'

const TESTIMONIALS = [
  {
    quote: 'Bractus completely transformed our engineering culture. Their team embedded with us, directed AI tools we didn\'t even know existed, and shipped in half the timeline we expected.',
    name: 'Jamie Stokes',
    role: 'CEO, JMJ Cloud',
    initials: 'JS',
  },
  {
    quote: 'We needed a partner who could move fast without sacrificing quality. Bractus delivered a production-ready platform our board was impressed with — on time and under budget.',
    name: 'Zach Mumford',
    role: 'General Manager, Mumford Restoration',
    initials: 'ZM',
  },
  {
    quote: 'The transparency and accountability exceeded our expectations. Every milestone was clear, every delivery was real. No hidden surprises — just great software.',
    name: 'Jon Oxidine',
    role: 'COO, Podium Audio',
    initials: 'JO',
  },
]

const FAQS = [
  { q: 'How experienced is the Bractus team?', a: 'We staff exclusively with senior professionals — architects, engineers, and data specialists with deep enterprise backgrounds. Every project is led by someone who has built production systems at scale.' },
  { q: 'How do you ensure projects stay on-time and on-budget?', a: 'Transparency and accountability. Every engagement includes a dedicated delivery lead, biweekly executive summaries, and working demos at each milestone. You\'ll always know exactly where your project stands.' },
  { q: 'Can you scale to meet enterprise-level demands?', a: 'Absolutely. Our AI-augmented approach means each professional delivers significantly more output. We\'ve scaled engagements rapidly for clients facing tight deadlines.' },
  { q: 'Do we own the IP if AI agents helped build it?', a: 'Yes — full ownership, no exceptions. Every deliverable we produce is yours, regardless of what tools or AI agents were involved.' },
  { q: 'How does Bractus use AI in delivery?', a: 'We pair experienced professionals with AI agents to accelerate every phase. Engineers set the direction and review all outputs — AI handles high-volume execution. Faster delivery, lower cost, same rigor.' },
  { q: 'How do you handle security and compliance?', a: 'Security is foundational. We follow enterprise security standards including SOC 2, HIPAA, and GDPR as baseline practice, and integrate with your existing security policies from day one.' },
]

export function Founder() {
  return (
    <section id="about" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 48, alignItems: 'center',
        }}>
          <div>
            <span className="tag" style={{ marginBottom: 20, display: 'inline-flex' }}>ABOUT US</span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400, marginBottom: 20,
            }}>
              Built by founders,<br />
              <span className="accent-text">for builders.</span>
            </h2>
            <p style={{
              color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 16,
            }}>
              After building, scaling, and exiting several successful companies, we launched Bractus
              to bring entrepreneurial problem-solving to ambitious leaders.
            </p>
            <p style={{
              color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 32,
            }}>
              Our outcome-driven teams partner directly with C-suite executives to solve core technology
              challenges, deliver measurable business results, and provide board-ready insights every step of the way.
            </p>
          </div>

          <div className="card" style={{ padding: '36px 32px' }}>
            <div style={{
              fontSize: '3.5rem', lineHeight: 1,
              color: 'var(--accent)', opacity: 0.3,
              fontFamily: 'Georgia, serif', marginBottom: 8,
            }}>"</div>
            <p style={{
              fontSize: '1.05rem', color: 'var(--text)',
              lineHeight: 1.75, fontStyle: 'italic', marginBottom: 24,
            }}>
              The way enterprise software gets built has changed. AI agents can now handle significant
              portions of development — but only when directed by experienced professionals who understand your business.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', background: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 400, fontSize: '0.85rem',
                fontFamily: 'Nunito, sans-serif',
              }}>B</div>
              <div>
                <div style={{ fontWeight: 400, fontSize: '0.92rem' }}>Bractus Team</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>AI-Augmented Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Testimonials() {
  const CLIENTS = [
    { name: 'JMJ Cloud', logo: '☁️' },
    { name: 'Mumford', logo: '🛠️' },
    { name: 'Podium', logo: '🎙️' },
    { name: 'Oracle', logo: '🏛️' },
    { name: 'Vercel', logo: '▲' },
  ]

  return (
    <section id="testimonials" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        {/* Client Logos Section */}
        <div style={{ marginBottom: 80, textAlign: 'center' }}>
          <p style={{ 
            fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', 
            textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 32 
          }}>Trusted by growth-stage & mid-market leaders</p>
          <div style={{ 
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', 
            gap: 'clamp(40px, 8vw, 100px)', alignItems: 'center', opacity: 0.6 
          }}>
            {CLIENTS.map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 10, filter: 'grayscale(1)' }}>
                <span style={{ fontSize: '1.5rem' }}>{c.logo}</span>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.03em' }}>{c.name.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span className="tag">TESTIMONIALS</span>
        </div>
        <h2 style={{
          textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 400, marginBottom: 48,
        }}>
          What our clients <span className="accent-text">say</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20,
        }}>
          {TESTIMONIALS.map(({ quote, name, role, initials }) => (
            <div key={name} className="card" style={{ padding: '28px' }}>
              <div style={{
                color: 'var(--accent)', fontSize: '1.5rem', marginBottom: 16, opacity: 0.5,
              }}>❝</div>
              <p style={{
                fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24,
              }}>{quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 400, fontSize: '0.8rem', flexShrink: 0,
                }}>{initials}</div>
                <div>
                  <div style={{ fontWeight: 400, fontSize: '0.9rem' }}>{name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span className="tag">FAQ</span>
        </div>
        <h2 style={{
          textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 400, marginBottom: 48,
        }}>
          Frequently asked <span className="accent-text">questions</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FAQS.map(({ q, a }) => (
            <FaqItem key={q} q={q} a={a} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card" style={{
      padding: 0, overflow: 'hidden', cursor: 'pointer',
      borderColor: open ? 'var(--accent)' : 'var(--border)',
    }}
    onClick={() => setOpen(o => !o)}
    >
      <div style={{
        padding: '18px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16,
      }}>
        <span style={{ fontWeight: 400, fontSize: '0.95rem' }}>{q}</span>
        <span style={{
          fontSize: '1.2rem', color: 'var(--accent)', flexShrink: 0,
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease',
        }}>+</span>
      </div>
      <div style={{
        maxHeight: open ? 200 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.35s ease',
      }}>
        <p style={{
          padding: '0 24px 20px',
          fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7,
        }}>{a}</p>
      </div>
    </div>
  )
}
