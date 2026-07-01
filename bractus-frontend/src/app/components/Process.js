'use client'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'

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

// ─── Center Logo Component with Scroll-Linked Draw Animation ───
function HowWeWorkLogo() {
  const logoRef = useRef(null)

  // Track scroll position of the logo container relative to the viewport
  const { scrollYProgress: logoScrollProgress } = useScroll({
    target: logoRef,
    offset: ['start end', 'end center']
  })

  // Map logo scroll progress to draw length (starts when top enters bottom of viewport, finishes when it reaches center)
  const drawProgress = useTransform(logoScrollProgress, [0.08, 0.88], [0, 1])
  const smoothLogoDraw = useSpring(drawProgress, { stiffness: 45, damping: 20 })

  return (
    <div 
      ref={logoRef}
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: 64,
        position: 'relative',
        zIndex: 2 
      }}
    >
      <svg
        width="180"
        height="315"
        viewBox="0 0 400 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="logoGrad" x1="110" y1="60" x2="300" y2="615" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#109D70" />
            <stop offset="100%" stopColor="#0A6781" />
          </linearGradient>
          <filter id="logoGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M110 60 Q110 20 150 20 L300 105 Q365 145 365 210 Q365 260 330 285 Q290 315 290 360 Q290 400 330 430 Q365 455 365 510 Q365 575 300 615 L150 690 Q110 690 110 650 L110 510 Q110 470 145 450 L225 405 Q260 385 260 360 Q260 335 225 315 L145 270 Q110 250 110 210 Z"
          fill="none"
          stroke="url(#logoGrad)"
          strokeWidth="34"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#logoGlow)"
          style={{ pathLength: smoothLogoDraw }}
        />
      </svg>
    </div>
  )
}

export function HowWeWork() {
  const containerRef = useRef(null)
  
  // Track scroll progress of the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Map progress to path draw length (winding line draws from 0.08 to 0.85)
  const drawProgress = useTransform(scrollYProgress, [0.08, 0.85], [0, 1])
  const smoothLineDraw = useSpring(drawProgress, { stiffness: 45, damping: 20 })

  return (
    <section 
      id="process" 
      ref={containerRef}
      className="section" 
      style={{ 
        position: 'relative', 
        overflow: 'visible', 
        background: 'var(--bg-alt)',
        paddingTop: 100,
        paddingBottom: 140
      }}
    >
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'visible',
        }}
        viewBox="0 0 1440 700"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Brand colors gradient */}
          <linearGradient id="scrollLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#109D70" />
            <stop offset="100%" stopColor="#0A6781" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="scrollGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated winding line (M -100 -120 to loop under card 03 and exit right) */}
        <motion.path
          d="M -100 -120 C 150 -120, 320 -50, 300 120 C 280 260, 100 280, 140 400 C 180 500, 380 320, 520 310 C 700 300, 950 250, 1100 350 C 1060 430, 980 500, 1020 600 C 1060 700, 1200 700, 1340 660 C 1480 620, 1550 500, 1700 480"
          stroke="url(#scrollLineGrad)"
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
          filter="url(#scrollGlow)"
          style={{ pathLength: smoothLineDraw }}
        />
      </svg>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
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
                transitionDelay: `${i * 0.15}s`,
                background: 'var(--surface)',
                boxShadow: 'var(--card-shadow)',
                borderRadius: 16,
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

        {/* Center Logo with Scroll-Linked Draw Trigger */}
        <HowWeWorkLogo />
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
