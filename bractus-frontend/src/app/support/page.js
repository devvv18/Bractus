'use client'

import React from 'react'

export default function ServicePage() {
  const contactEmail = process?.env?.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@bractus.com';

  const devSubject = encodeURIComponent("Engineering Support & Collaboration");
  const devBody = encodeURIComponent(
    `Hi Bractus Team,\n\n` +
    `I am reaching out to get some dedicated engineering support for my current project.\n` +
    `Here is a quick overview of what I am working on:\n` +
    `My Project: [Project Details]\n` +
    `Current Tech Stack: [Tech stack details]\n\n` +
    `I am looking for a reliable technical partner to help me push this across the finish line. Please let me know your availability for a quick introductory call to discuss how we might collaborate.\n\n` +
    `Best,\n` +
    `[Your Name]\n` +
    `[Link to your project/website, if applicable]`
  );

  return (
    <main style={{ 
      background: 'var(--bg)', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle background glow to keep details premium */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(7, 132, 98, 0.15) 0%, rgba(0,0,0,0) 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        textAlign: 'center', 
        padding: '48px 32px',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
        maxWidth: '440px',
        width: '100%'
      }}>
        <h1 style={{ 
          fontSize: '1.8rem', 
          fontWeight: 700, 
          color: 'var(--text)', 
          marginBottom: '16px' 
        }}>
          Individual Support
        </h1>
        <p style={{ 
          fontSize: '1rem', 
          fontWeight: 300, 
          color: 'var(--text-secondary)', 
          marginBottom: '32px',
          lineHeight: '1.6'
        }}>
          Connect directly with our engineering team for dedicated guidance and technical support.
        </p>
        <a 
          href={`mailto:${contactEmail}?subject=${devSubject}&body=${devBody}`} 
          className="btn-primary" 
          style={{ 
            borderRadius: 100,
            fontSize: '1.1rem',
            padding: '16px 36px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(7, 132, 98, 0.25)',
            transition: 'all 0.3s ease'
          }}
        >
          Request Support
        </a>
      </div>
    </main>
  )
}
