'use client'
import { useState } from 'react'

const contactEmail = process?.env?.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@bractus.com';

const TOOLS = [
  'AWS', 'GCP', 'Azure', 'Kubernetes', 'Docker', 'Terraform',
  'React', 'Next.js', 'Node.js', 'Python', 'Go', 'PostgreSQL',
  'MongoDB', 'OpenAI', 'LangChain', 'GitHub Actions',
]

export function ToolsAndPartners() {
  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
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
              fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 400,
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
          flexWrap: 'wrap', gap: 24,
        }}>
          <div style={{ maxWidth: 540 }}>
            <h2 style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 400, marginBottom: 12,
            }}>
              One partner for your entire <span className="accent-text">technology ecosystem.</span>
            </h2>
            <p style={{
              color: 'var(--text-secondary)', fontSize: '0.93rem', lineHeight: 1.7,
            }}>
              You need more than just developers; you need strategic architects. We bring the deep technical expertise required to build reliable, secure, and high-performance systems that scale alongside your business ambitions.
            </p>
          </div>
            <a href={`mailto:${contactEmail}?subject=Schedule%20a%20Call%20with%20Bractus&body=Hello%20Bractus%20Team%2C%0A%0AI%20would%20like%20to%20schedule%20a%20call%20to%20discuss%20how%20your%20technology%20services%20can%20help%20my%20organization.%0A%0ALooking%20forward%20to%20hearing%20from%20you%21`} className="btn-primary" style={{ padding: '14px 40px', fontSize: '1.05rem', borderRadius: 100 }}>
              Schedule a call
            </a>
        </div>
      </div>
    </section>
  )
}

export function GetInTouch() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const type = window.location.hash.includes('type=org') ? 'org' : 
                 window.location.hash.includes('type=dev') ? 'dev' : 'general';

    let subject = '';
    let bodyText = '';

    if (type === 'dev') {
      subject = `Engineering Support & Collaboration`;
      bodyText = `Hi Bractus Team,\n\n` +
                 `I am reaching out to get some dedicated engineering support for my current project.\n\n` +
                 `Here is a quick overview of what I am working on:\n` +
                 `My Project: ${form.message}\n` +
                 `Current Tech Stack: [Fill your tech stack]\n\n` +
                 `I am looking for a reliable technical partner to help me push this across the finish line. Please let me know your availability for a quick introductory call to discuss how we might collaborate.\n\n` +
                 `Best,\n` +
                 `${form.name}\n` +
                 `[Link to your project/website]`;
    } else if (type === 'org') {
      subject = `Engineering & Development Services`;
      bodyText = `Hi Bractus Team,\n\n` +
                 `I am reaching out on behalf of ${form.company || '[Your Company]'}. We are currently looking for a reliable technology partner to help us scale our engineering capabilities and execute our digital roadmap.\n\n` +
                 `We are primarily looking for expertise in:\n` +
                 `${form.message || '[e.g., Legacy System Modernization / Cloud Infrastructure / Building a new AI tool from scratch]'}\n\n` +
                 `We need a dedicated team that can take technical ownership and deliver secure, high-performance results.\n\n` +
                 `I would love to schedule a brief discovery call this week to discuss our upcoming initiatives and see if Bractus is the right fit to support our growth. Let me know what your schedule looks like over the next few days.\n\n` +
                 `Best regards,\n` +
                 `${form.name}\n` +
                 `[Your Job Title]\n` +
                 `${form.company || '[Your Company]'}`;
    } else {
      subject = `Inquiry: ${form.service || 'General'} - ${form.company || form.name}`;
      bodyText = `Hello Bractus Team,\n\n` +
                 `I am reaching out to discuss ${form.service || 'your services'}.\n\n` +
                 `${form.message}\n\n` +
                 `Best regards,\n` +
                 `${form.name}\n` +
                 `${form.company ? form.company : ''}`;
    }

    const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

    try {
      await fetch('http://localhost:3001/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
    } catch (err) {
      console.warn("Backend not reachable, proceeding with email redirect only.");
    } finally {
      setLoading(false);
      setSent(true);
      window.location.href = mailtoLink;
    }
  }

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
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
              fontWeight: 400, marginBottom: 16,
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
                { label: 'Location:', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>, text: 'Delhi, India' },
                { label: 'Phone:', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>, text: '9667507343' },
                { label: 'Mail:', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>, text: 'hr@bractus.com' },
              ].map(({ icon, text, label }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'var(--accent-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0,
                  }}>{icon}</div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <strong style={{ color: 'var(--text)', marginRight: 6 }}>{label}</strong>
                    {text}
                  </span>
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
                <h3 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 400, fontSize: '1.3rem' }}>
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
  display: 'block', fontSize: '0.75rem', fontWeight: 400,
  color: 'var(--text-muted)', textTransform: 'uppercase',
  letterSpacing: '0.06em', marginBottom: 6,
}