'use client'
import Link from 'next/link'

export default function TermsOfService() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 120, paddingBottom: 100 }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <Link href="/" style={{ 
          display: 'inline-flex', alignItems: 'center', gap: 8, 
          color: 'var(--accent)', textDecoration: 'none', fontSize: '0.9rem', marginBottom: 40,
          fontWeight: 500
        }}>
          ← Back to Home
        </Link>

        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 400, marginBottom: 12 }}>Terms of Service</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 60 }}>Last Updated: October 3, 2025</p>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 20, color: 'var(--text)' }}>1. Acceptance of Terms</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
              By accessing our website and communicating with us regarding our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from using or accessing this site.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 20, color: 'var(--text)' }}>2. Description of Services</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
              Bractus provides software engineering, system architecture, artificial intelligence integration, and technical advisory services. The specific scope, deliverables, and fees for any project will be outlined in a separate, mutually agreed-upon Statement of Work (SOW) or master service agreement.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 20, color: 'var(--text)' }}>3. Intellectual Property Rights</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                <strong>Our Website:</strong> The content, design, branding, and layout of this website are the property of Bractus and are protected by applicable intellectual property laws.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                <strong>Client Deliverables:</strong> We believe in 100% IP ownership for our clients. Upon full payment for our customized engineering services, all rights, title, and interest in the specific deliverables, code, and project assets created for you will be transferred entirely to you, unless otherwise specified in your specific project contract.
              </p>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 20, color: 'var(--text)' }}>4. User Obligations</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
              When reaching out via our website or using our services, you agree to provide accurate, current, and complete information. You agree not to use our website for any unlawful purpose or in any way that could damage, disable, overburden, or impair our infrastructure.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 20, color: 'var(--text)' }}>5. Disclaimer of Warranties</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
              The information and services on this website are provided on an "as is" and "as available" basis. Bractus make no warranties, expressed or implied, regarding the website's uninterrupted availability or the complete accuracy of the informational content provided.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 20, color: 'var(--text)' }}>6. Limitation of Liability</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
              In no event shall Bractus or its representatives be liable for any indirect, consequential, incidental, or punitive damages arising out of your use of our website or the preliminary implementation of technical advice provided prior to a formal service agreement.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 20, color: 'var(--text)' }}>7. Governing Law</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
              These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 20, color: 'var(--text)' }}>8. Contact Information</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
              For any questions regarding these Terms of Service, please contact us at <a href="mailto:hr@bractus.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>hr@bractus.com</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
