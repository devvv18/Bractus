'use client'

const STEPS = [
  {
    num: '01',
    title: 'We Listen',
    desc: 'We start by deeply understanding your business — your goals, your constraints, and the outcomes that matter most. From there, we map out a clear technology direction built around your specific needs.',
  },
  {
    num: '02',
    title: 'We Build',
    desc: 'Our senior professionals embed directly with your team, directing AI agents to accelerate every phase of delivery — always maintaining enterprise-grade quality, on time and within budget.',
  },
  {
    num: '03',
    title: 'We Evolve',
    desc: 'After delivery, we measure real impact on your business and customers. Then we recalibrate, optimize, and identify the next opportunity to push your technology further forward.',
  },
]

const VALUES = [
  { title: 'Outcomes over activity.', desc: 'We focus on what moves your business forward — not hours logged or tickets closed. Every decision we make is tied directly to results you can measure.' },
  { title: 'You own everything.', desc: 'Every line of code, every system, every deliverable is 100% yours. No vendor lock-in, no shared IP — just clean, documented work that belongs to your organization.' },
  { title: 'Flexible engagement.', desc: 'No long-term commitments required. We earn the next phase by delivering on the current one — giving you full control over scope, timeline, and investment.' },
  { title: 'One team, one throat to choke.', desc: 'A single senior professional owns your engagement end-to-end. No finger-pointing between teams, no handoff failures — just clear accountability from day one.' },
  { title: 'Complete visibility.', desc: 'You always know exactly where your project stands. Daily updates, working demos at every milestone, and honest reporting — no surprises, ever.' },
  { title: 'Senior talent, AI-powered speed.', desc: 'Every engagement is led by experienced professionals who direct AI agents to deliver more, faster. You get enterprise-grade expertise at a cost that makes business sense.' },
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
