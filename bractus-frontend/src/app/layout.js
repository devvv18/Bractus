import './globals.css'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import ScrollReveal from './components/ScrollReveal'

export const metadata = {
  title: 'Bractus — AI & Software Development Consulting',
  description: 'Bractus delivers software engineering, DevOps, AI integration, and cloud services with senior professionals wielding AI-native toolchains for enterprise-grade outcomes.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var t = localStorage.getItem('bractus-theme') || 'light';
            document.documentElement.setAttribute('data-theme', t);
          })();
        ` }} />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main style={{ paddingTop: 72 }}>
            {children}
          </main>
          <Footer />
          <ChatBot />
          <ScrollReveal />
        </ThemeProvider>
      </body>
    </html>
  )
}