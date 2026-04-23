'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const SERVICES = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
    title: 'Advisory',
    subtitle: 'Strategy & Consulting',
    desc: 'Fractional CTO leadership that understands how AI changes the build-vs-buy equation for your business.',
    linkText: 'Learn More →',
    href: '/services/advisory',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    title: 'Development',
    subtitle: 'Application Development',
    desc: 'Software your customers rely on — built by experienced engineers directing AI agents through every stage.',
    linkText: 'Learn More →',
    href: '/services/development',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
    title: 'DevOps',
    subtitle: 'DevOps & Performance',
    desc: 'Cloud infrastructure and CI/CD pipelines designed for speed — with AI-augmented automation that cuts deployment time.',
    linkText: 'Learn More →',
    href: '/services/devops',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    title: 'Data Science',
    subtitle: 'Data & Analytics',
    desc: 'Data engineering and analytics powered by experienced analysts and AI agents that surface insights humans alone would miss.',
    linkText: 'Learn More →',
    href: '/services/data-science',
  },
]

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SERVICES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const next = () => setCurrentIndex((i) => (i + 1) % SERVICES.length)
  const prev = () => setCurrentIndex((i) => (i - 1 + SERVICES.length) % SERVICES.length)

  // Calculate 3D stacking positions
  const getCardStyle = (index) => {
    const total = SERVICES.length;
    let diff = index - currentIndex;

    // Smooth circular wrapping logic
    if (diff > Math.floor(total / 2)) {
      diff -= total;
    } else if (diff < -Math.floor(total / 2)) {
      diff += total;
    }

    let translateX = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 10;
    let pointerEvents = 'auto';

    if (diff === 0) {
      // Center card
      translateX = 0;
      scale = 1;
      opacity = 1;
      zIndex = 30;
    } else if (diff === 1) {
      // Right card
      translateX = '55%';
      scale = 0.85;
      opacity = 0.4;
      zIndex = 20;
      pointerEvents = 'none';
    } else if (diff === -1) {
      // Left card
      translateX = '-55%';
      scale = 0.85;
      opacity = 0.4;
      zIndex = 20;
      pointerEvents = 'none';
    } else {
      // Hidden behind (or far sides)
      translateX = '0%';
      scale = 0.6;
      opacity = 0;
      zIndex = 10;
      pointerEvents = 'none';
    }

    return {
      position: 'absolute',
      left: 0,
      right: 0,
      margin: '0 auto',
      width: '100%',
      maxWidth: 380,
      transform: `translateX(${translateX}) scale(${scale})`,
      opacity: opacity,
      zIndex: zIndex,
      pointerEvents: pointerEvents,
      transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
    };
  };

  return (
    <section id="services" className="section" style={{ background: 'var(--bg)', overflowX: 'hidden' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span className="tag" style={{ marginBottom: 16 }}>OUR SERVICES</span>
        </div>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 400, marginBottom: 16,
        }}>
          Modernize your <span className="accent-text">operation</span>
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: 'clamp(0.95rem, 1.8vw, 1.08rem)',
          maxWidth: 600, margin: '0 auto 56px',
          lineHeight: 1.7,
        }}>
          Our team embeds with yours to modernize your technology — directing AI agents
          to accelerate every phase of delivery. You get experienced professionals,
          smarter tooling, and real cost savings.
        </p>

        {/* 3D Carousel Stack */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 1000, margin: '0 auto' }}>
          
          <div style={{ position: 'relative', height: 380, width: '100%' }}>
            {SERVICES.map((service, index) => (
              <div key={index} style={getCardStyle(index)}>
                <ServiceCard {...service} active={index === currentIndex} />
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24,
            marginTop: 16 
          }}>
            <button onClick={prev} style={navBtnStyle} aria-label="Previous service">
              ←
            </button>
            <div style={{ display: 'flex', gap: 6 }}>
              {SERVICES.map((_, i) => (
                <div key={i} style={{
                  width: i === currentIndex ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === currentIndex ? 'var(--accent)' : 'var(--border-light)',
                  transition: 'all 0.4s ease',
                  border: i !== currentIndex ? '1px solid var(--border)' : 'none'
                }} />
              ))}
            </div>
            <button onClick={next} style={navBtnStyle} aria-label="Next service">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ icon, title, subtitle, desc, linkText, href, active }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="card" style={{
      cursor: active ? 'pointer' : 'default',
      borderColor: (hovered && active) ? 'var(--accent)' : 'var(--border)',
      background: 'var(--surface)',
      boxShadow: active ? 'var(--card-shadow-hover)' : 'var(--card-shadow)',
      height: '100%',
      minHeight: 320,
      display: 'flex', flexDirection: 'column',
      transition: 'border-color 0.3s ease',
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 10,
        background: 'var(--accent-light)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent)',
        marginBottom: 20,
      }}>{icon}</div>
      <div style={{
        fontSize: '0.75rem', fontWeight: 400, color: 'var(--accent)',
        textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8,
      }}>{title}</div>
      <h3 style={{
        fontFamily: 'Nunito, sans-serif', fontSize: '1.4rem',
        fontWeight: 400, marginBottom: 12, lineHeight: 1.3
      }}>{subtitle}</h3>
      <p style={{
        fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65, 
        marginBottom: 32, flexGrow: 1
      }}>{desc}</p>
      
      {active && (
        <Link href={href} style={{
          fontSize: '0.95rem', fontWeight: 400,
          color: hovered ? 'var(--accent-hover)' : 'var(--accent)',
          transition: 'color 0.2s',
          display: 'inline-block'
        }}>
          {linkText}
        </Link>
      )}
    </div>
  )
}

const navBtnStyle = {
  width: 44, height: 44, borderRadius: '50%',
  background: 'var(--surface)', border: '1.5px solid var(--border)',
  color: 'var(--text)', fontSize: '1.2rem',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', transition: 'all 0.2s',
  boxShadow: 'var(--card-shadow)'
}