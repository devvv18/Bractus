'use client'

const PILLARS = [
  { icon: '🎯', title: 'Mission-first', desc: 'Every decision traces back to your business goal — not our convenience.' },
  { icon: '🔁', title: 'Iterate fast', desc: 'We ship weekly, gather feedback, and improve relentlessly.' },
  { icon: '🌍', title: 'Global talent', desc: 'World-class engineers, designers, and strategists under one roof.' },
  { icon: '💎', title: 'Quality obsessed', desc: 'We hold ourselves to a bar that most agencies never consider.' },
]

export default function About() {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        padding: 'clamp(80px, 10vh, 120px) clamp(20px, 6vw, 96px)',
        background: '#0a0c14',
        overflow: 'hidden',
      }}
    >
      {/* Blob */}
      <div className="mesh-blob" style={{
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
        top: '20%', right: '-5%',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: 'clamp(40px, 6vw, 80px)',
        alignItems: 'center',
      }}>
        {/* Text */}
        <div>
          <span className="section-label" style={{ marginBottom: 24, display: 'inline-flex' }}>
            About Bractus
          </span>
          <h2 style={{
            fontFamily: 'Syne, Inter, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.03em',
            marginTop: 16,
            marginBottom: 20,
            lineHeight: 1.15,
          }}>
            Built different.<br />
            <span className="grad-text">Delivering different.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, fontSize: '1rem', marginBottom: 16 }}>
            Bractus is a product studio that operates at the intersection of design,
            engineering, and strategy. We don&apos;t just build software — we build competitive moats.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: 36 }}>
            Founded with a simple belief: that world-class product experiences shouldn&apos;t be reserved
            for large enterprises. We work with founders, scale-ups, and Fortune 500s alike.
          </p>
          <a
            href="#contact"
            className="btn-glow"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              color: '#fff',
              padding: '13px 28px',
              borderRadius: 12,
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              border: '1px solid rgba(167,139,250,0.25)',
            }}
          >
            Our story →
          </a>
        </div>

        {/* Pillars grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className="glass card-lift"
              style={{
                borderRadius: 16,
                padding: '22px 20px',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginBottom: 6 }}>{p.title}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
