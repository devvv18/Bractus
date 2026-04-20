'use client'

const TEAM = [
  {
    name: 'Arjun Sharma',
    role: 'CEO & Founder',
    emoji: '👨‍💼',
    bio: 'Serial entrepreneur. 10+ yrs building category-defining products.',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.15)',
    socials: ['tw', 'li'],
  },
  {
    name: 'Priya Mehta',
    role: 'Chief Technology Officer',
    emoji: '👩‍💻',
    bio: 'Ex-Google engineer. Loves distributed systems and clean code.',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.15)',
    socials: ['gh', 'li'],
  },
  {
    name: 'Rahul Patel',
    role: 'Head of Design',
    emoji: '👨‍🎨',
    bio: 'Design nerd. Crafts experiences that feel like magic.',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.15)',
    socials: ['dr', 'li'],
  },
  {
    name: 'Sneha Joshi',
    role: 'Head of Operations',
    emoji: '👩‍💼',
    bio: 'Keeps the machine running. Master of scale and process.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.15)',
    socials: ['tw', 'li'],
  },
]

const socialIcon = (key) => ({
  tw: '𝕏',
  li: 'in',
  gh: 'gh',
  dr: 'dr',
}[key] ?? key)

export default function Team() {
  return (
    <section
      id="team"
      style={{
        position: 'relative',
        padding: 'clamp(80px, 10vh, 120px) clamp(20px, 6vw, 96px)',
        background: 'linear-gradient(180deg, #0a0c14 0%, #08090d 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blob */}
      <div className="mesh-blob animate-float" style={{
        width: 450, height: 450,
        background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
        bottom: '-5%', left: '10%',
      }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 72 }}>
        <span className="section-label" style={{ marginBottom: 20, display: 'inline-flex' }}>
          The people
        </span>
        <h2 style={{
          fontFamily: 'Syne, Inter, sans-serif',
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.03em',
          marginTop: 16,
          marginBottom: 14,
        }}>
          Meet the <span className="grad-text">crew</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '1rem', maxWidth: 420, margin: '0 auto' }}>
          Diverse minds. Unified mission. Relentless execution.
        </p>
      </div>

      {/* Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 24,
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        {TEAM.map((member) => (
          <div
            key={member.name}
            className="glass card-lift"
            style={{
              borderRadius: 22,
              overflow: 'hidden',
              position: 'relative',
            }}
            onMouseEnter={e => {
              e.currentTarget.querySelector('.inner-glow').style.opacity = '1'
              e.currentTarget.style.borderColor = `${member.color}33`
            }}
            onMouseLeave={e => {
              e.currentTarget.querySelector('.inner-glow').style.opacity = '0'
              e.currentTarget.style.borderColor = ''
            }}
          >
            {/* Inner glow */}
            <div
              className="inner-glow"
              style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse at 50% 0%, ${member.glow} 0%, transparent 65%)`,
                opacity: 0,
                transition: 'opacity 0.4s',
                pointerEvents: 'none',
              }}
            />

            {/* Avatar area */}
            <div style={{
              height: 160,
              background: `radial-gradient(ellipse at 50% 100%, ${member.glow} 0%, rgba(255,255,255,0.02) 80%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              {/* Ring */}
              <div style={{
                width: 90, height: 90,
                borderRadius: '50%',
                background: `${member.color}14`,
                border: `2px solid ${member.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 40,
                boxShadow: `0 0 30px ${member.color}25`,
              }}>
                {member.emoji}
              </div>

              {/* Status dot */}
              <div style={{
                position: 'absolute', bottom: 16, right: 20,
                width: 8, height: 8,
                borderRadius: '50%',
                background: '#34d399',
                boxShadow: '0 0 8px #34d399',
              }} />
            </div>

            {/* Info */}
            <div style={{ padding: '22px 22px 20px' }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>
                {member.name}
              </div>
              <div style={{ color: member.color, fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em', marginBottom: 12 }}>
                {member.role}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', lineHeight: 1.65, marginBottom: 18 }}>
                {member.bio}
              </p>

              {/* Social links */}
              <div style={{ display: 'flex', gap: 8 }}>
                {member.socials.map(key => (
                  <button
                    key={key}
                    style={{
                      width: 30, height: 30,
                      borderRadius: 8,
                      background: `${member.color}12`,
                      border: `1px solid ${member.color}25`,
                      color: member.color,
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${member.color}25`; e.currentTarget.style.transform = 'scale(1.1)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = `${member.color}12`; e.currentTarget.style.transform = 'scale(1)' }}
                  >
                    {socialIcon(key)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Join us banner */}
      <div
        className="glass"
        style={{
          maxWidth: 700,
          margin: '64px auto 0',
          borderRadius: 20,
          padding: 'clamp(24px, 4vw, 40px) clamp(24px, 5vw, 56px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20,
          background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(59,130,246,0.06))',
          borderColor: 'rgba(124,58,237,0.2)',
        }}
      >
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: 6 }}>
            Want to join the crew?
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
            We&apos;re always hiring exceptional talent.
          </div>
        </div>
        <a
          href="#contact"
          className="btn-glow"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            color: '#fff',
            padding: '11px 24px',
            borderRadius: 10,
            fontWeight: 600,
            fontSize: '0.875rem',
            textDecoration: 'none',
            border: '1px solid rgba(167,139,250,0.2)',
            whiteSpace: 'nowrap',
          }}
        >
          View openings →
        </a>
      </div>
    </section>
  )
}