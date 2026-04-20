'use client'

const SERVICES = [
  {
    icon: '⚡',
    title: 'Product Engineering',
    desc: 'From MVPs to enterprise platforms — we architect, build, and scale software that moves fast without breaking things.',
    tags: ['React', 'Node.js', 'Cloud'],
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.2)',
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    desc: 'Premium interfaces that convert. We obsess over every pixel, interaction, and micro-animation to deliver WOW moments.',
    tags: ['Figma', 'Framer', 'Motion'],
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.2)',
  },
  {
    icon: '🤖',
    title: 'AI Integration',
    desc: 'We embed AI deeply into your product — from intelligent automations to custom LLM pipelines that actually work.',
    tags: ['LLMs', 'ML Ops', 'RAG'],
    color: '#34d399',
    glow: 'rgba(52,211,153,0.2)',
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    desc: 'Bulletproof infrastructure on AWS, GCP, or Azure. CI/CD pipelines, Kubernetes, and zero-downtime deployments.',
    tags: ['AWS', 'Docker', 'K8s'],
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.2)',
  },
  {
    icon: '📊',
    title: 'Data & Analytics',
    desc: 'Turn raw data into unfair advantages. Custom dashboards, data pipelines, and decision-ready insights.',
    tags: ['SQL', 'Spark', 'Looker'],
    color: '#f472b6',
    glow: 'rgba(244,114,182,0.2)',
  },
  {
    icon: '🔒',
    title: 'Security & Compliance',
    desc: 'Enterprise-grade security baked in from day one. Pen testing, SOC 2 prep, and continuous threat monitoring.',
    tags: ['SOC 2', 'GDPR', 'PenTest'],
    color: '#fb7185',
    glow: 'rgba(251,113,133,0.2)',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      style={{
        position: 'relative',
        padding: 'clamp(80px, 10vh, 120px) clamp(20px, 6vw, 96px)',
        background: 'linear-gradient(180deg, #08090d 0%, #0a0c14 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '1px', height: '100px',
        background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.5), transparent)',
      }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 72 }}>
        <span className="section-label" style={{ marginBottom: 20, display: 'inline-flex' }}>
          What we do
        </span>
        <h2 style={{
          fontFamily: 'Syne, Inter, sans-serif',
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.03em',
          marginTop: 16,
          marginBottom: 16,
        }}>
          Services that{' '}
          <span className="grad-text">drive results</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto' }}>
          We pair deep technical expertise with a bias for execution — no fluff, just impact.
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20,
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        {SERVICES.map((svc) => (
          <div
            key={svc.title}
            className="glass card-lift"
            style={{
              borderRadius: 20,
              padding: 28,
              cursor: 'default',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = `${svc.color}44`
              e.currentTarget.querySelector('.svc-glow').style.opacity = '1'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = ''
              e.currentTarget.querySelector('.svc-glow').style.opacity = '0'
            }}
          >
            {/* Inner glow on hover */}
            <div
              className="svc-glow"
              style={{
                position: 'absolute', inset: 0,
                borderRadius: 20,
                background: `radial-gradient(ellipse at top left, ${svc.glow} 0%, transparent 60%)`,
                opacity: 0,
                transition: 'opacity 0.4s',
                pointerEvents: 'none',
              }}
            />

            {/* Icon */}
            <div style={{
              width: 52, height: 52,
              borderRadius: 14,
              background: `${svc.color}18`,
              border: `1px solid ${svc.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24,
              marginBottom: 20,
            }}>
              {svc.icon}
            </div>

            <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: 10 }}>
              {svc.title}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 20 }}>
              {svc.desc}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {svc.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: 6,
                  background: `${svc.color}12`,
                  border: `1px solid ${svc.color}25`,
                  color: svc.color,
                  letterSpacing: '0.05em',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}