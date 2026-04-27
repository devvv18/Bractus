'use client'

const STEPS = [
  {
    num: '01',
    title: 'Architect & Advice',
    desc: 'We start by analyzing your unique business challenges and technical requirements. Our senior architects then design a comprehensive, secure blueprint that serves as a scalable foundation for your digital transformation.',
  },
  {
    num: '02',
    title: 'Engineer & Execute',
    desc: 'We bring the blueprint to life with uncompromising quality. Whether building from scratch or collaborating with your team, our full-stack teams develop, rigorously test, and integrate robust solutions tailored to your exact needs.',
  },
  {
    num: '03',
    title: 'Deploy & Evolve',
    desc: 'As your dedicated technology partner, our job doesn\'t end at launch. We handle secure cloud deployments, configure continuous delivery pipelines, and proactively optimize your systems so they grow seamlessly alongside your business.',
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

export function HowWeWork() {
  return (
    <section id="process" className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span className="tag">HOW WE WORK</span>
        </div>
        <h2 style={{
          textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 400, marginBottom: 56,
        }}>
          A framework built for <span className="accent-text">reliability</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {STEPS.map(({ num, title, desc }) => (
            <div key={num} className="card" style={{ textAlign: 'center', padding: '36px 28px' }}>
              <div style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '3.5rem', fontWeight: 400,
                color: 'var(--accent)', opacity: 0.2,
                lineHeight: 1, marginBottom: 16,
              }}>{num}</div>
              <h3 style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '1.2rem', fontWeight: 400, marginBottom: 12,
              }}>{title}</h3>
              <p style={{
                fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7,
              }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WhyChooseUs() {
  return (
    <section className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <p style={{
          fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7,
          textAlign: 'center', maxWidth: 620, margin: '0 auto 16px',
        }}>
          Our teams deliver the outcomes you need — quickly and efficiently — so you see progress, not just process.
        </p>
        <h2 style={{
          textAlign: 'center', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
          fontWeight: 400, marginBottom: 48,
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
                fontFamily: 'Nunito, sans-serif',
                fontSize: '1rem', fontWeight: 400, marginBottom: 8,
              }}>{title}</h4>
              <p style={{
                fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65,
              }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
