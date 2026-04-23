'use client'

const BADGES = ['Advisory', 'Development', 'DevOps', 'Data']

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      background: 'var(--bg)',
      overflow: 'hidden',
    }}>
      {/* Subtle background pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
        opacity: 0.4,
        pointerEvents: 'none',
      }} />

      {/* Accent glow */}
      <div style={{
        position: 'absolute',
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        filter: 'blur(80px)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 72 }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
        }}>
          {/* Tag */}
          <div className="anim-fade-up" style={{ marginBottom: 28 }}>
            <span className="tag">✦ AI-Augmented Delivery</span>
          </div>

          {/* Headline forced to 3 lines */}
          <h1 className="anim-fade-up anim-delay-1" style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            marginBottom: 24,
          }}>
            Cross-functional teams of<br />
            senior professionals wielding<br />
            <span className="accent-text">AI‑native toolchains</span>
          </h1>

          {/* Subtext */}
          <p className="anim-fade-up anim-delay-2" style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            maxWidth: 580,
            marginBottom: 32,
          }}>
            Delivering outcomes with the accountability and rigor
            enterprise systems require — from strategy through deployment.
          </p>

          {/* Badge row */}
          <div className="anim-fade-up anim-delay-2" style={{
            display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 40,
          }}>
            {BADGES.map(b => (
              <span key={b} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 16px', borderRadius: 100,
                border: '1px solid var(--border)',
                fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 400,
              }}>
                <span style={{ color: 'var(--accent)', fontSize: 14 }}>✓</span>
                {b}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="anim-fade-up anim-delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 64 }}>
            <a href="#contact" className="btn-primary">Schedule a call</a>
            <a href="#services" className="btn-outline">Watch video</a>
          </div>

          {/* Stats */}
          <div className="anim-fade-up anim-delay-4" style={{
            display: 'flex', gap: 'clamp(32px, 6vw, 64px)', justifyContent: 'center',
            paddingTop: 32,
            borderTop: '1px solid var(--border)',
            width: '100%', maxWidth: 720
          }}>
            {[
              { value: '120+', label: 'Clients Served' },
              { value: '50+', label: 'Projects Delivered' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '8+', label: 'Years Experience' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                  fontWeight: 400, color: 'var(--accent)',
                }}>{value}</div>
                <div style={{
                  fontSize: '0.75rem', color: 'var(--text-muted)',
                  textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4,
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}