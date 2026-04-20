import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Bractus — We Build the Future of Digital Business',
  description: 'Bractus is a world-class product studio delivering software engineering, design, AI integration, and cloud services that help businesses scale faster.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <footer style={{
          background: '#0a0c14',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: 'clamp(40px, 6vw, 64px) clamp(20px, 6vw, 96px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              width: 28, height: 28,
              background: 'linear-gradient(135deg, #7c3aed, #60a5fa)',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 900, color: '#fff',
              boxShadow: '0 0 14px rgba(124,58,237,0.4)',
            }}>B</span>
            <span style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem' }}>bractus</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>
            © 2025 Bractus Inc. All rights reserved. — Made with ❤️ in India
          </p>
        </footer>
      </body>
    </html>
  )
}