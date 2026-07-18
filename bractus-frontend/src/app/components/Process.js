'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

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
    desc: "As your dedicated technology partner, our job doesn't end at launch. We handle secure cloud deployments, configure continuous delivery pipelines, and proactively optimize your systems so they grow seamlessly alongside your business.",
  },
]

const VALUES = [
  { title: 'No over-promising.', desc: "We don't sell hype. We analyze your technical requirements deeply to architect realistic, scalable solutions and commit to timelines we can actually deliver." },
  { title: 'No loss of equity.', desc: 'Your code is your asset. From day one, you retain complete ownership of all intellectual property, data architecture, and custom integrations we build.' },
  { title: 'No long-term contract.', desc: "We earn your trust through results, not rigid contracts. Our flexible engagement models allow you to scale resources up or down as your project demands." },
  { title: 'End-to-End Ownership', desc: 'No pointing fingers. From initial system blueprinting to final deployment and maintenance, our team takes complete responsibility for the technical outcome.' },
  { title: 'Absolute Transparency', desc: 'Get complete visibility into our development cycles. You receive honest reporting, direct access to the engineers, and regular milestone updates without the fluff.' },
  { title: 'Elite Technical Talent', desc: 'Bypass the hiring grind. You get immediate access to senior developers, architects, and AI specialists who build secure, production-ready systems from the ground up.' },
]

// Brand logo coordinates in 1080x1080 viewBox
const BRAND_LOGO_PATH = "M724.65,457.58c10.36-30.59,1.82-64.68-21.8-86.64-6.01-5.59-12.54-9.55-19.7-13.69l-91.38-52.71-76.03-43.74-71.11-40.83c-16.27-9.34-36.91-8.06-53.85-1.57-22.22,9.4-37.49,29.6-39.79,53.58v129c.01,19.59,7.84,37.69,20.8,51.8,6.29,6.85,13.14,11.79,21.16,16.43l64.68,37.41,56.4,32.53c1.87,1.08,2.55,3.57,2.46,5.34-.1,1.98-1.39,3.62-3.32,4.69l-38.37,21.32-33.47,18.61-52.19,29.46c-20.56,11.61-38.06,37.53-38.07,60.94l-.03,117.16c0,10.23,2.99,19.67,7.4,28.66,14.24,29.04,46.09,46.13,78.21,40.26,4.88-.89,9.32-2.44,13.64-4.7l12.05-6.33,123.86-65.38,99.68-54.03c28.19-15.28,44.2-48.44,43.08-80.34-.59-16.74-5.71-32.74-15.39-46.3-7.09-9.93-16.42-17.19-26.73-23.5-8.59-5.25-16.68-10.71-24.41-17.05-6.27-5.14-10.49-12.07-11.99-19.98-2.19-11.51,2.93-22.95,12.59-29.26l29.55-19.3c15.26-9.97,26.26-24.65,32.08-41.84ZM672.72,450.08l-29.59,20.48c-34.52,23.88-50.41,71.48-26.88,108.83,4.7,7.46,9.92,14.24,16.77,19.74l17.48,14.01,17.71,13.25c10.92,8.73,16.7,21.57,15.67,35.45-.92,12.54-6.79,23.56-16.8,31.19l-12.19,7.51-73.93,39.99-52.3,28.08-95.82,51.02c-8.41,4.48-19.01,2.08-25.92-3.95-6.28-5.47-9.93-13.24-9.94-21.76l-.09-106.18c0-8.1,1.83-15.14,6.43-21.75,3.62-5.19,8.4-9.31,13.96-12.45l15.2-8.57,63.26-35.26,56.45-32.12c12.29-7.5,19.29-22.14,18.58-36.35-.72-14.15-8.78-26.83-20.83-33.82l-47.36-27.5-89.56-51.74c-9.13-7.07-15.99-17.08-15.99-28.98l-.1-118.5c0-5.96,2.25-11.22,6.39-15.48,5.82-6,16-7.96,23.77-3.45l86.54,50.16,92.86,53.78,51.38,29.58,11.08,7.26c6.62,5.19,11.51,11.89,13.64,20.07,2.73,10.52-.8,21.16-9.87,27.44Z"

// Single continuous path — one entity: entry curve + logo contour, treated as one thread
// Entry: M-800,100 → 390.78,218.4 (21% of total path length)
// Logo:  390.78,218.4 → traces full logo → back to 390.78,218.4 (remaining 79%)
const COMBINED_PATH = "M-800,100 C-300,-200,50,-150,390.78,218.4 C368.56,227.8,353.29,248,350.99,271.98 V400.98 C351,420.57,358.83,438.67,371.79,452.78 C378.08,459.63,384.93,464.57,392.95,469.21 L457.63,506.62 L514.03,539.15 C515.9,540.23,516.58,542.72,516.49,544.49 C516.39,546.47,515.1,548.11,513.17,549.18 L474.8,570.5 L441.33,589.11 L389.14,618.57 C368.58,630.18,351.08,656.1,351.07,679.51 L351.04,796.67 C351.04,806.9,354.03,816.34,358.44,825.33 C372.68,854.37,404.53,871.46,436.65,865.59 C441.53,864.7,445.97,863.15,450.29,860.89 L462.34,854.56 L586.2,789.18 L685.88,735.15 C714.07,719.87,730.08,686.71,728.96,654.81 C728.37,638.07,723.25,622.07,713.57,608.51 C706.48,598.58,697.15,591.32,686.84,585.01 C678.25,579.76,670.16,574.3,662.43,567.96 C656.16,562.82,651.94,555.89,650.44,547.98 C648.25,536.47,653.37,525.03,663.03,518.72 L692.58,499.42 C707.84,489.45,718.84,474.77,724.66,457.58 C735.01,426.99,726.47,392.9,702.85,370.94 C696.84,365.35,690.31,361.39,683.15,357.25 L591.77,304.54 L515.74,260.8 L444.63,219.97 C428.36,210.63,407.72,211.91,390.78,218.4"

export function HowWeWork() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  // Create a highly-responsive, tight spring to cushion mouse wheel increments without introducing slide lag
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.0001
  })
  // Head: draws the entire thread from start (0) to end (1) — entry + logo as ONE entity
  // 0.02 → 0.85 scroll: expanded range to slow down drawing speed on scroll
  const pathDraw = useTransform(smoothScroll, [0.02, 0.85], [0, 1], { clamp: true })

  // Tail: starts follow-erasing the entry line early (at 0.10 progress)
  // Reaches 40.4% depth exactly at 41% scroll progress (which equates to 47% pathDraw progress under the new range)
  const pathOffset = useTransform(pathDraw, [0, 0.10, 0.47, 1], [0, 0, 0.404, 0.404], { clamp: true })

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section"
      style={{
        position: 'relative',
        overflow: 'visible',
        background: 'var(--bg-alt)',
        paddingTop: 100,
        paddingBottom: 220, // slightly tighter padding for layout balance
      }}
    >
      {/* Glass card styles — light & dark mode */}
      <style dangerouslySetInnerHTML={{
        __html: `
        #process .hw-card {
          background: rgba(248, 249, 250, 0.52);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.88);
          box-shadow: 0 2px 24px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.04);
        }
        [data-theme="dark"] #process .hw-card {
          background: rgba(15, 23, 42, 0.52);
          border-color: rgba(255, 255, 255, 0.07);
          box-shadow: 0 2px 24px rgba(0, 0, 0, 0.35);
        }
      ` }} />

      {/* ── Section content — sits above the SVG via z-index ── */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span className="tag">HOW WE WORK</span>
        </div>

        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 400,
          marginBottom: 56,
        }}>
          A framework built for <span className="accent-text">reliability</span>
        </h2>

        {/* Relative wrapper centered vertically and horizontally enclosing the grid and SVG */}
        <div style={{ position: 'relative', width: '100%' }}>
          {/* Centered Scroll-Driven SVG Logo Canvas */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(100vw, 820px)',
            height: 'min(100vw, 820px)',
            pointerEvents: 'none',
            zIndex: -1,
          }}>
            <svg
              aria-hidden="true"
              style={{
                width: '100%',
                height: '100%',
                overflow: 'visible',
              }}
              viewBox="0 0 1080 1080"
            >
              <defs>
                {/* Brand gradient */}
                <linearGradient
                  id="hw-brand-grad"
                  x1="350.99"
                  y1="540"
                  x2="729.01"
                  y2="540"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#078462" />
                  <stop offset="100%" stopColor="#013f4a" />
                </linearGradient>

                {/* Soft glow */}
                <filter id="hw-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

              </defs>

              {/* Single thread entity: sweeps from left, forms the logo, then entry line erases behind */}
              <motion.path
                d={COMBINED_PATH}
                fill="none"
                stroke="url(#hw-brand-grad)"
                strokeWidth="46"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#hw-glow)"
                style={{
                  pathLength: pathDraw,
                  pathOffset: pathOffset,
                }}
              />
            </svg>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            position: 'relative',
            zIndex: 1,
          }}>
            {STEPS.map(({ num, title, desc }, i) => (
              <div
                key={num}
                className={`hw-card card reveal ${i === 0 ? 'reveal-left' : i === 2 ? 'reveal-right' : 'reveal-text'
                  }`}
                style={{
                  textAlign: 'center',
                  padding: '42px 28px', // slightly increased vertical padding
                  transitionDelay: `${i * 0.15}s`,
                  borderRadius: 16,
                }}
              >
                <div style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '3.5rem',
                  fontWeight: 400,
                  color: 'var(--accent)',
                  opacity: 0.18,
                  lineHeight: 1,
                  marginBottom: 16,
                }}>{num}</div>

                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.2rem',
                  fontWeight: 400,
                  marginBottom: 12,
                }}>{title}</h3>

                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text)',
                  lineHeight: 1.7,
                  fontWeight: 450,
                }}>{desc}</p>
              </div>
            ))}
          </div>
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
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          textAlign: 'center',
          maxWidth: 620,
          margin: '0 auto 16px',
        }}>
          Our teams deliver the outcomes you need quickly and efficiently, <br /> so you see progress, not just process.
        </p>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
          fontWeight: 400,
          marginBottom: 48,
        }}>
          Why teams <span className="accent-text">choose us</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          gap: 20,
        }}>
          {VALUES.map(({ title, desc }) => (
            <div key={title} style={{
              padding: '24px 28px',
              borderBottom: '1px solid var(--border)',
            }}>
              <h4 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1rem',
                fontWeight: 400,
                marginBottom: 8,
              }}>{title}</h4>
              <p style={{
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
              }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
