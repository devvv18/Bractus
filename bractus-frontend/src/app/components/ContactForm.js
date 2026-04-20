'use client'
import { useState } from 'react'

const SERVICES = ['Product Engineering', 'UI/UX Design', 'AI Integration', 'Cloud & DevOps', 'Data & Analytics', 'Other']

export default function ContactForm() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('idle')
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('http://localhost:3001/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ firstName: '', lastName: '', email: '', service: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        padding: 'clamp(80px, 10vh, 120px) clamp(20px, 6vw, 96px)',
        background: '#08090d',
        overflow: 'hidden',
      }}
    >
      {/* Blobs */}
      <div className="mesh-blob" style={{
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
        top: '-15%', right: '-10%',
      }} />
      <div className="mesh-blob" style={{
        width: 350, height: 350,
        background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)',
        bottom: '5%', left: '-5%',
      }} />

      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 'clamp(40px, 6vw, 80px)',
        alignItems: 'start',
      }}>
        {/* Left info */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label" style={{ marginBottom: 24, display: 'inline-flex' }}>
            Let&apos;s talk
          </span>
          <h2 style={{
            fontFamily: 'Syne, Inter, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.03em',
            marginTop: 16,
            marginBottom: 20,
            lineHeight: 1.15,
          }}>
            Ready to build<br />
            <span className="grad-text">something great?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: 40 }}>
            Tell us about your project. We&apos;ll get back to you within 24 hours with a plan tailored to your goals.
          </p>

          {/* Contact info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: '📧', label: 'Email', val: 'hello@bractus.com' },
              { icon: '📍', label: 'Location', val: 'Bengaluru, India · Remote worldwide' },
              { icon: '⏰', label: 'Response time', val: 'Within 24 hours' },
            ].map(({ icon, label, val }) => (
              <div key={label} className="glass" style={{ borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
                  <div style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 500, marginTop: 2 }}>{val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <form
            onSubmit={handleSubmit}
            className="glass"
            style={{
              borderRadius: 24,
              padding: 'clamp(24px, 4vw, 40px)',
              background: 'rgba(255,255,255,0.025)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              {['firstName', 'lastName'].map((field) => (
                <div key={field}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>
                    {field === 'firstName' ? 'First name' : 'Last name'}
                  </label>
                  <input
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    required
                    placeholder={field === 'firstName' ? 'Arjun' : 'Sharma'}
                    className="input-dark"
                  />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="arjun@company.com"
                className="input-dark"
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>
                Service interested in
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="input-dark"
                style={{ cursor: 'pointer' }}
              >
                <option value="" style={{ background: '#0f1117' }}>Select a service…</option>
                {SERVICES.map(s => <option key={s} value={s} style={{ background: '#0f1117' }}>{s}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Tell us about your project — the bigger the ambition, the more we like it."
                className="input-dark"
                style={{ resize: 'none' }}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-glow"
              style={{
                width: '100%',
                background: status === 'success'
                  ? 'linear-gradient(135deg, #059669, #10b981)'
                  : 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                color: '#fff',
                padding: '14px',
                borderRadius: 12,
                fontWeight: 700,
                fontSize: '0.95rem',
                border: 'none',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.7 : 1,
                transition: 'all 0.3s',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 0 32px rgba(124,58,237,0.35)',
              }}
            >
              {status === 'loading' && '⏳ Sending…'}
              {status === 'success' && '✅ Message sent!'}
              {status === 'error'   && '❌ Failed — try again'}
              {status === 'idle'    && 'Send message →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}