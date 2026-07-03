'use client'
import { useState } from 'react'

const HOW_WE_WORK = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
      </svg>
    ),
    title: 'Daily Stand-Up Meetings',
    desc: 'Internal alignment maintains our momentum. Our cross-functional teams sync daily to eliminate technical blockers, optimize code quality, and ensure the development cycle stays perfectly on schedule.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 14H6l-2 2V4h16v12z"/>
      </svg>
    ),
    title: 'Dedicated Project Management',
    desc: 'You are never left in the dark. Your dedicated project lead provides clear, strategic updates on deliverables, flags architectural decisions for your review, and ensures our engineering aligns with your business goals.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
      </svg>
    ),
    title: 'Agile Engineering Sprints',
    desc: 'We break down complex system requirements into manageable, high-velocity sprints. This allows us to rapidly build, test, and deliver functional components without compromising enterprise-grade rigor.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
      </svg>
    ),
    title: 'Continuous Optimization',
    desc: 'At the end of every sprint, we review the deployed architecture and code performance. We constantly recalibrate our approach to maximize efficiency and ensure your investment is driving tangible results.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
      </svg>
    ),
    title: 'Working Software Demos',
    desc: 'We don\'t just send status reports; we show you the code in action. At every major milestone, you get hands-on access to test the working software, ensuring the product matches your exact specifications.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5z"/>
      </svg>
    ),
    title: 'Enterprise-Grade Security',
    desc: 'Security is never an afterthought. From day one, we architect your systems with strict compliance standards and best practices in mind, ensuring your applications, data pipelines, and cloud infrastructure are rock-solid.',
  },
]

export default function ProcessPage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Hero Banner — Particle41 style full-width colored section */}
      <section style={{
        background: 'var(--accent)',
        paddingTop: 160,
        paddingBottom: 100,
        textAlign: 'center',
      }}>
        <div className="container">
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1.25,
            marginBottom: 24,
            maxWidth: 760,
            margin: '0 auto 24px',
          }}>
            You provide the vision. We provide engineering firepower.
          </h1>
          <p style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: 820,
            margin: '0 auto',
            lineHeight: 1.75,
          }}>
            Our delivery model integrates elite technical talent, senior architects, full-stack engineers, and data specialists, directly into your workflow. Whether modernizing legacy infrastructure or building custom platforms from scratch, this rigorous approach ensures rapid execution, cost efficiency, reliable, and secure, production-ready solutions.
          </p>
        </div>
      </section>

      {/* How our team works — 2 column icon+text list */}
      <section style={{ paddingTop: 100, paddingBottom: 100, background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 400, lineHeight: 1.25,
            }}>
              A Partnership Built on Transparency
            </h2>
            <p style={{
              color: 'var(--text-secondary)', fontSize: '1rem',
              maxWidth: 750, margin: '16px auto 0', lineHeight: 1.75,
            }}>
              No matter the complexity of your technical challenge, our Agile delivery model ensures total visibility, seamless collaboration, and measurable progress at every stage of development.
            </p>
          </div>

          {/* 2-column feature list — more responsive grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '48px 40px',
          }}>
            {HOW_WE_WORK.map(({ icon, title, desc }, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                gap: 'clamp(16px, 4vw, 24px)', 
                alignItems: 'flex-start',
                padding: '0 4px'
              }}>
                {/* Icon */}
                <div style={{
                  color: 'var(--accent)',
                  flexShrink: 0,
                  marginTop: 4,
                }}>
                  {icon}
                </div>
                {/* Text */}
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1.05rem', fontWeight: 700,
                    marginBottom: 10, color: 'var(--text)',
                  }}>{title}</h3>
                  <p style={{
                    fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75,
                  }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}