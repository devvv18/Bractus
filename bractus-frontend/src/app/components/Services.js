'use client'
import { useState } from 'react'
import Link from 'next/link'

const SERVICES = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    tag: 'DEVELOPMENT',
    title: 'Websites & Applications',
    desc: 'Tailored digital experiences designed for scale. We build responsive, enterprise-grade web platforms and custom applications that drive user engagement and streamline complex business operations.',
    linkText: 'Learn More →',
    href: '/services',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    tag: 'CORE ENGINEERING',
    title: 'Full-Stack Engineering',
    desc: 'End-to-end development capabilities from the database to the user interface. Our cross-functional teams build robust, secure, reliable, and seamlessly integrated software solutions from scratch.',
    linkText: 'Learn More →',
    href: '/services',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
    tag: 'ADVISORY & STRATEGY',
    title: 'System Architecture',
    desc: 'Strategic blueprints for digital transformation. We design scalable, future-proof frameworks and seamlessly reshape legacy systems to ensure your technology stack aligns with your long-term business goals.',
    linkText: 'Learn More →',
    href: '/services',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
    tag: 'INNOVATION',
    title: 'AI & Machine Learning',
    desc: 'Empower your operations with intelligent automation and predictive insights. We develop and integrate custom AI/ML models that solve complex logic problems and create distinct competitive advantages.',
    linkText: 'Learn More →',
    href: '/services',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>,
    tag: 'INFRASTRUCTURE',
    title: 'Cloud & DevOps',
    desc: 'Accelerate delivery and ensure maximum reliability. We implement efficient CI/CD pipelines and design secure, highly available cloud environments to keep your enterprise running flawlessly.',
    linkText: 'Learn More →',
    href: '/services',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
    tag: 'INTELLIGENCE',
    title: 'Data Engineering',
    desc: 'Turn raw information into an actionable strategy. We architect scalable data pipelines and robust storage solutions, ensuring your business data is accurate, secure, and ready for advanced analytics.',
    linkText: 'Learn More →',
    href: '/services',
  },
]

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((i) => (i + 1) % SERVICES.length)
  }
  const prev = () => {
    setCurrentIndex((i) => (i - 1 + SERVICES.length) % SERVICES.length)
  }

  const getCardStyle = (index) => {
    const total = SERVICES.length
    let diff = index - currentIndex

    if (diff > Math.floor(total / 2)) diff -= total
    else if (diff < -Math.floor(total / 2)) diff += total

    let translateX = 0
    let scale = 1
    let opacity = 1
    let zIndex = 10
    let pointerEvents = 'auto'

    // Multi-dimensional coordinates adjusted so 5 cards fit perfectly in viewport simultaneously
    if (diff === 0) {
      translateX = 0; scale = 1; opacity = 1; zIndex = 30
    } else if (diff === 1) {
      translateX = '35%'; scale = 0.88; opacity = 0.55; zIndex = 20; pointerEvents = 'none'
    } else if (diff === -1) {
      translateX = '-35%'; scale = 0.88; opacity = 0.55; zIndex = 20; pointerEvents = 'none'
    } else if (diff === 2) {
      translateX = '70%'; scale = 0.76; opacity = 0.2; zIndex = 10; pointerEvents = 'none'
    } else if (diff === -2) {
      translateX = '-70%'; scale = 0.76; opacity = 0.2; zIndex = 10; pointerEvents = 'none'
    } else {
      translateX = '0%'; scale = 0.6; opacity = 0; zIndex = 5; pointerEvents = 'none'
    }

    return {
      position: 'absolute',
      left: '50%',
      marginLeft: -190, // half of maxWidth 380
      width: '100%',
      maxWidth: 380,
      transform: `translateX(${translateX}) scale(${scale})`,
      opacity,
      zIndex,
      pointerEvents,
      transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
      overflow: 'visible',
      transformOrigin: 'center center',
    }
  }

  return (
    <section id="services" className="section" style={{ background: 'var(--bg)', overflowX: 'visible', position: 'relative' }}>
      {/* Immersive 3D CSS Styles */}
      <style>{`
        @keyframes backgroundSpin {
          0% { transform: rotateY(0deg); }
          15%, 100% { transform: rotateY(360deg); }
        }
        .service-card-active {
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1) !important;
        }
        .service-card-active:hover {
          transform: translateY(-24px) translateZ(30px) !important;
          box-shadow: 0 35px 70px -10px rgba(30, 64, 175, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
          border-color: var(--accent) !important;
        }
        .rotation-wrapper {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
      `}</style>

      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span className="tag" style={{ marginBottom: 16 }}>OUR EXPERTISE</span>
        </div>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 400, marginBottom: 16,
        }}>
          Scale your <span className="accent-text">vision</span>
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: 'clamp(0.95rem, 1.8vw, 1.08rem)',
          maxWidth: 600, margin: '0 auto 56px',
          lineHeight: 1.7,
        }}>
          We don't just write code; we partner with you to solve foundational business challenges.
          From modernizing mission-critical legacy infrastructure to developing intelligent,
          AI-driven platforms from scratch, our cross-functional teams deliver end-to-end
          technical excellence tailored to your goals.
        </p>

        <div style={{
          position: 'relative',
          width: '100vw',
          left: '50%',
          transform: 'translateX(-50%)',
          margin: '0 auto',
          height: 480,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflowX: 'visible',
          perspective: '1200px',
        }}>
          {/* overflow: visible so side cards are not clipped */}
          <div style={{ position: 'relative', height: 380, width: '100%', overflow: 'visible' }}>
            {SERVICES.map((service, index) => {
              const isBackground = index !== currentIndex
              
              // Pure-CSS infinite 360 spin periodic keyframes with cascaded index delays
              const spinAnimation = isBackground
                ? 'backgroundSpin 5s infinite cubic-bezier(0.4, 0, 0.2, 1)'
                : 'none'
              const spinDelay = `${index * 1.25}s`

              return (
                <div
                  key={index}
                  style={getCardStyle(index)}
                >
                  <div 
                    className="rotation-wrapper"
                    style={{
                      animation: spinAnimation,
                      animationDelay: spinDelay,
                      transformStyle: 'preserve-3d',
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <ServiceCard
                      {...service}
                      active={index === currentIndex}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Only arrows — centred under carousel (circles/dots completely removed) */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 56,
            marginTop: 8,
          }}>
            <button onClick={prev} style={navBtnStyle} aria-label="Previous service">←</button>
            <button onClick={next} style={navBtnStyle} aria-label="Next service">→</button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ icon, tag, title, desc, linkText, href, active }) {
  const [hovered, setHovered] = useState(false)

  const innerStyle = {
    cursor: active ? 'pointer' : 'default',
    borderColor: (hovered && active) ? 'var(--accent)' : 'var(--border)',
    background: 'var(--surface)',
    boxShadow: active ? 'var(--card-shadow-hover)' : 'var(--card-shadow)',
    height: '100%',
    minHeight: 320,
    display: 'flex', flexDirection: 'column',
    transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease',
    overflow: 'visible',
    position: 'relative'
  }

  return (
    <div
      className={`card${active ? ' service-card-active' : ''}`}
      style={innerStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: 48, 
        height: 48, 
        borderRadius: 10,
        background: 'var(--accent-light)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent)', 
        marginBottom: 20,
        transition: 'all 0.3s'
      }}>{icon}</div>
      
      <div style={{
        fontSize: '0.75rem', 
        fontWeight: 400, 
        color: 'var(--accent)',
        textTransform: 'uppercase', 
        letterSpacing: '0.1em', 
        marginBottom: 8,
      }}>{tag}</div>
      
      <h3 style={{
        fontFamily: 'Nunito, sans-serif', 
        fontSize: '1.4rem',
        fontWeight: 400, 
        marginBottom: 12, 
        lineHeight: 1.3,
        color: '#fff',
      }}>{title}</h3>
      
      <p style={{
        fontSize: '0.95rem', 
        color: 'var(--text-secondary)', 
        lineHeight: 1.65,
        marginBottom: 32, 
        flexGrow: 1,
      }}>{desc}</p>
      
      {active && (
        <Link href={href} style={{
          fontSize: '0.95rem', fontWeight: 400,
          color: hovered ? 'var(--accent-hover)' : 'var(--accent)',
          transition: 'color 0.2s', display: 'inline-block',
          textDecoration: 'none'
        }}>
          {linkText}
        </Link>
      )}
    </div>
  )
}

const navBtnStyle = {
  width: 44,
  height: 44,
  borderRadius: '50%',
  background: 'var(--surface)',
  border: '1.5px solid var(--border)',
  color: 'var(--text)',
  fontSize: '1.2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s',
  boxShadow: 'var(--card-shadow)'
}