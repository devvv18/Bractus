'use client'
import Link from 'next/link'

export default function PrivacyPolicy() {
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

        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 400, marginBottom: 12 }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 60 }}>Last Updated: October 9, 2025</p>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 20, color: 'var(--text)' }}>1. Introduction</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
              Welcome to Bractus. This Privacy Policy explains how Bractus Innovations Pvt. Ltd., doing business as Bractus ("we," "us," or "our"), collects, uses, and protects your information when you visit our website or engage our services.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 20, color: 'var(--text)' }}>2. Information We Collect</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                <strong>Information You Provide:</strong> We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our services. This includes names, email addresses, phone numbers, company names, and project details submitted through our contact forms or direct emails.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                <strong>Automatically Collected Information:</strong> We automatically collect certain information when you visit, use, or navigate the website. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, and referring URLs.
              </p>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 20, color: 'var(--text)' }}>3. How We Use Your Information</h2>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, fontSize: '1.05rem', paddingLeft: 20 }}>
              <li>To respond to your inquiries and provide customer support.</li>
              <li>To deliver the technical services and project estimates you request.</li>
              <li>To send administrative information, such as updates to our terms, conditions, and policies.</li>
              <li>To improve our website functionality and user experience.</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 20, color: 'var(--text)' }}>4. Data Sharing and Disclosure</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
              We do not sell, rent, or trade your personal information to third parties. We may share your data with trusted third-party vendors, service providers, or contractors who perform services for us or on our behalf (e.g., web hosting, email delivery) strictly under confidentiality agreements.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 20, color: 'var(--text)' }}>5. International Data Transfers</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
              Our operations support international clients. Your information may be transferred to, stored, and processed in countries other than your own. By using our website and services, you consent to this cross-border transfer of data.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 20, color: 'var(--text)' }}>6. Your Privacy Rights</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
              Depending on your location, you may have the right to request access to the personal data we collect from you, change that information, or delete it. To request a review, update, or deletion of your personal information, please contact us using the details below.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 20, color: 'var(--text)' }}>7. Contact Us</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
              If you have questions or comments about this notice, you may email us at <a href="mailto:info@bractus.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>info@bractus.com</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
