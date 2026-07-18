'use client'

import React from 'react'

export default function PartnerPage() {
  const contactEmail = process?.env?.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@bractus.com';

  const orgSubject = encodeURIComponent("Engineering & Development Services");
  const orgBody = encodeURIComponent(
    `Hi Bractus Team,\n\n` +
    `I am reaching out on behalf of [Your Company Name]. We are currently looking for a reliable technology partner to help us scale our engineering capabilities and execute our digital roadmap.\n\n` +
    `We are primarily looking for expertise in:\n` +
    `[e.g., Legacy System Modernization / Cloud Infrastructure / Building a new AI tool from scratch]\n\n` +
    `We need a dedicated team that can take technical ownership and deliver secure, high-performance results.\n\n` +
    `I would love to schedule a brief discovery call this week to discuss our upcoming initiatives and see if Bractus is the right fit to support our growth. Let me know what your schedule looks like over the next few days.\n\n` +
    `Best regards,\n` +
    `[Your Name]\n` +
    `[Your Job Title]\n` +
    `[Your Company Name]`
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
          For Organizations
        </h1>
        <p style={{ 
          fontSize: '1rem', 
          fontWeight: 300, 
          color: 'var(--text-secondary)', 
          marginBottom: '32px',
          lineHeight: '1.6'
        }}>
          Scale your digital and software development capabilities instantly with our dedicated team.
        </p>
        <a 
          href={`mailto:${contactEmail}?subject=${orgSubject}&body=${orgBody}`} 
          className="btn-outline" 
          style={{ 
            borderRadius: 100,
            background: 'var(--bg)',
            fontSize: '1.1rem',
            padding: '16px 36px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border)',
            boxShadow: '0 8px 24px rgba(255, 255, 255, 0.02)',
            transition: 'all 0.3s ease'
          }}
        >
          Partner with us
        </a>
      </div>
    </main>
  )
}
