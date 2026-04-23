'use client'
import { useState } from 'react'

const TOOLS = [
  'AWS', 'GCP', 'Azure', 'Kubernetes', 'Docker', 'Terraform',
  'React', 'Next.js', 'Node.js', 'Python', 'Go', 'PostgreSQL',
  'MongoDB', 'OpenAI', 'LangChain', 'GitHub Actions',
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setSent(true)
    setLoading(false)
  }

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">

        {/* Tools / Partners */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{
            fontSize: '0.72rem', color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.12em',
          }}>Tools & partners</span>
        </div>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 72,
        }}>
          {TOOLS.map(t => (
            <span key={t} style={{
              padding: '6px 16px', borderRadius: 100,
              border: '1px solid var(--border)',
              fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500,
              transition: 'all 0.2s', cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
            >{t}</span>
          ))}
        </div>

        {/* CTA Banner */}
        <div style={{
          background: 'var(--accent-light)',
          border: '1px solid var(--accent)',
          borderRadius: 16,
          padding: 'clamp(32px, 5vw, 56px) clamp(24px, 5vw, 56px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 24, marginBottom: 72,
        }}>
          <div style={{ maxWidth: 540 }}>
            <h2 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 800, marginBottom: 12,
            }}>
              The way software gets built is <span className="accent-text">changing. Fast.</span>
            </h2>
            <p style={{
              color: 'var(--text-secondary)', fontSize: '0.93rem', lineHeight: 1.7,
            }}>
              You need experienced professionals who know how to direct AI tools —
              people who understand enterprise architecture and production systems.
            </p>
          </div>
          <a href="#contact-form" className="btn-primary" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            Schedule a call →
          </a>
        </div>

        {/* Contact Form */}
        <div id="contact-form" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 48,
        }}>
          {/* Left - Info */}
          <div>
            <span className="tag" style={{ marginBottom: 20, display: 'inline-flex' }}>GET IN TOUCH</span>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              fontWeight: 800, marginBottom: 16,
            }}>
              Let's build <span className="accent-text">something great</span>
            </h2>
            <p style={{
              color: 'var(--text-secondary)', fontSize: '0.93rem',
              lineHeight: 1.8, marginBottom: 36,
            }}>
              Tell us about your project and the outcomes you're seeking.
              We'll map out a digital direction together.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: '📍', text: 'Mumbai, Maharashtra, India' },
                { icon: '📞', text: '+91 98765 43210' },
                { icon: '✉️', text: 'hello@bractus.com' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'var(--accent-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0,
                  }}>{icon}</div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="card" style={{ padding: 32 }}>
            {sent ? (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', minHeight: 300,
                textAlign: 'center', gap: 16,
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'var(--accent-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28,
                }}>✓</div>
                <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1.3rem' }}>
                  Message sent!
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  We'll be in touch within 24 hours.
                </p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', company: '', service: '', message: '' }) }}
                  className="btn-outline btn-sm" style={{ marginTop: 8 }}>
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input name="name" required value={form.name} onChange={onChange}
                      placeholder="Jane Smith" className="field" />
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={onChange}
                      placeholder="jane@company.com" className="field" />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Company</label>
                  <input name="company" value={form.company} onChange={onChange}
                    placeholder="Acme Inc." className="field" />
                </div>
                <div>
                  <label style={labelStyle}>Service Needed</label>
                  <select name="service" value={form.service} onChange={onChange}
                    className="field" style={{ cursor: 'pointer', appearance: 'none' }}>
                    <option value="">Select a service...</option>
                    <option>Strategy & Advisory</option>
                    <option>Application Development</option>
                    <option>DevOps & Cloud</option>
                    <option>AI & Data Science</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea name="message" required rows={4} value={form.message} onChange={onChange}
                    placeholder="Tell us about your project..."
                    className="field" style={{ resize: 'vertical', minHeight: 100 }} />
                </div>
                <button type="submit" className="btn-primary"
                  style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
                  disabled={loading}>
                  {loading ? 'Sending…' : 'Send message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const labelStyle = {
  display: 'block', fontSize: '0.75rem', fontWeight: 600,
  color: 'var(--text-muted)', textTransform: 'uppercase',
  letterSpacing: '0.06em', marginBottom: 6,
}