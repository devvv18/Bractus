'use client'

const STEPS = [
  {
    num: '01',
    title: 'We talk',
    desc: 'We find out about your business and the outcomes you\'re seeking. Then we map out a digital direction that\'s right for you.',
  },
  {
    num: '02',
    title: 'We collaborate',
    desc: 'We work shoulder-to-shoulder with your team to build and launch a tailored digital solution — always on time and on budget.',
  },
  {
    num: '03',
    title: 'We advance',
    desc: 'You\'ll see the difference in the lives of your customers and employees. Then we\'ll recalibrate to see if there\'s any more ground to gain.',
  },
]

const VALUES = [
  { title: 'No over-promising.', desc: 'We listen first, understand your business, then map out a direction aligned with your goals.' },
  { title: 'No loss of equity.', desc: 'You own 100% of everything we create — your IP, your success, your future.' },
  { title: 'No long-term contract.', desc: 'Your investment goes directly to results — not months of unnecessary busy work.' },
  { title: 'Full accountability.', desc: 'One team, clear responsibility, no finger-pointing — just measurable impact.' },
  { title: 'Radical transparency.', desc: 'Clear updates, honest reporting, and total visibility at every step.' },
  { title: 'Proven expertise.', desc: 'Enterprise-grade teams now augmented by AI agents for faster, more cost-effective results.' },
]

export default function Process() {
  return (
    <>
      {/* ── Process Steps ── */}
      <section id="process" className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <span className="tag">HOW WE WORK</span>
          </div>
          <h2 style={{
            textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800, marginBottom: 56,
          }}>
            A process built on <span className="accent-text">trust</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} className="card" style={{ textAlign: 'center', padding: '36px 28px' }}>
                <div style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '3.5rem', fontWeight: 800,
                  color: 'var(--accent)', opacity: 0.2,
                  lineHeight: 1, marginBottom: 16,
                }}>{num}</div>
                <h3 style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '1.2rem', fontWeight: 700, marginBottom: 12,
                }}>{title}</h3>
                <p style={{
                  fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7,
                }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <a href="#contact" className="btn-primary">Schedule a call →</a>
          </div>
        </div>
      </section>

      {/* ── Values / Pillars ── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <p style={{
            fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7,
            textAlign: 'center', maxWidth: 620, margin: '0 auto 16px',
          }}>
            Our teams deliver the outcomes you need — quickly and efficiently — so you see progress, not just process.
          </p>
          <h2 style={{
            textAlign: 'center', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 800, marginBottom: 48,
          }}>
            Why teams <span className="accent-text">choose us</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20,
          }}>
            {VALUES.map(({ title, desc }) => (
              <div key={title} style={{
                padding: '24px 28px',
                borderBottom: '1px solid var(--border)',
              }}>
                <h4 style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '1rem', fontWeight: 700, marginBottom: 8,
                }}>{title}</h4>
                <p style={{
                  fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65,
                }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
