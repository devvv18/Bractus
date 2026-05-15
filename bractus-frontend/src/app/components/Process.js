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
  { title: 'No over-promising.', desc: 'We don\'t sell hype. We analyze your technical requirements deeply to architect realistic, scalable solutions and commit to timelines we can actually deliver.' },
  { title: 'No loss of equity.', desc: 'Your code is your asset. From day one, you retain complete ownership of all intellectual property, data architecture, and custom integrations we build.' },
  { title: 'No long-term contract.', desc: 'We earn your trust through results, not rigid contracts. Our flexible engagement models allow you to scale resources up or down as your project demands.' },
  { title: 'End-to-End Ownership', desc: 'No pointing fingers. From initial system blueprinting to final deployment and maintenance, our team takes complete responsibility for the technical outcome.' },
  { title: 'Absolute Transparency', desc: 'Get complete visibility into our development cycles. You receive honest reporting, direct access to the engineers, and regular milestone updates without the fluff.' },
  { title: 'Elite Technical Talent', desc: 'Bypass the hiring grind. You get immediate access to senior developers, architects, and AI specialists who build secure, production-ready systems from the ground up.' },
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
          {STEPS.map(({ num, title, desc }, i) => (
            <div key={num}
              className={`card reveal ${i === 0 ? 'reveal-left' : i === 2 ? 'reveal-right' : 'reveal-text'}`}
              style={{
                textAlign: 'center',
                padding: '36px 28px',
                transitionDelay: `${i * 0.15}s`
              }}>
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
          Our teams deliver the outcomes you need quickly and efficiently, so you see progress, not just process.
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
