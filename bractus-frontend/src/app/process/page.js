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
    desc: 'Every morning, your dedicated team syncs on progress, blockers, and next steps. Nothing gets missed, nothing gets delayed — you always know exactly what is happening and why.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 14H6l-2 2V4h16v12z"/>
      </svg>
    ),
    title: 'Daily Client Communication',
    desc: 'Your dedicated project manager sends clear, concise updates every single day — flagging decisions that need your input and showing exactly how our AI-augmented workflows are compressing your timeline.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
      </svg>
    ),
    title: 'Focused Sprints',
    desc: 'We work in tight, purposeful sprints — each one producing tangible, testable output. Senior engineers direct AI agents to handle high-volume execution while maintaining the precision your product demands.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
      </svg>
    ),
    title: 'Sprint Retrospectives',
    desc: 'At the close of every sprint, we review what shipped, assess what AI contributed, and identify what to sharpen next. Your investment is always accounted for — down to every decision and deliverable.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
      </svg>
    ),
    title: 'Milestone Demos',
    desc: 'We do not deliver status updates — we deliver working software. At every major milestone, you see real functionality in action, giving you confidence that the build is on track and built right.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5z"/>
      </svg>
    ),
    title: 'Security & Compliance Built In',
    desc: 'Security is never an afterthought. From day one, we build to SOC 2, HIPAA, and GDPR standards — integrating seamlessly with your existing governance policies and data protection requirements.',
  },
]

export default function ProcessPage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Hero Banner */}
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
            Your goals are clear. Our process is built to get you there.
          </h1>
          <p style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: 720,
            margin: '0 auto',
            lineHeight: 1.75,
          }}>
            We do not just assign resources and hope for the best. Our structured,
            AI-augmented delivery model gives you senior professionals who own outcomes,
            transparent communication at every step, and working software you can see
            and test — from kickoff through launch and beyond.
          </p>
        </div>
      </section>

      {/* How our team works — 2 column icon+text list */}
      <section style={{ paddingTop: 100, paddingBottom: 100, background: '#f0f6fb' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 400, lineHeight: 1.25,
            }}>
              Here's how our team will work with yours
            </h2>
            <p style={{
              color: 'var(--text-secondary)', fontSize: '1rem',
              maxWidth: 600, margin: '16px auto 0', lineHeight: 1.75,
            }}>
              No matter what type of challenge you bring, we are dedicated solely to
              accomplishing your goals — and giving you complete visibility into the process.
            </p>
          </div>

          {/* 2-column feature list */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '48px 80px',
          }}>
            {HOW_WE_WORK.map(({ icon, title, desc }, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <div style={{
                  color: 'var(--accent)',
                  flexShrink: 0,
                  marginTop: 4,
                }}>
                  {icon}
                </div>
                <div>
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