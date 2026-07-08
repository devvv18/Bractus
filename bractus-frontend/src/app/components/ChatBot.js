'use client'
import { Suspense, useState, useRef, useEffect } from 'react'

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi! I\'m John. How can I help you regarding Bractus today?' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const [isWaving, setIsWaving] = useState(false)
  const bottomRef = useRef(null)

  // Auto-scroll chat
  useEffect(() => {
    if (open && messages.length > 1) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open])

  // Trigger waving animation dynamically WHILE scrolling
  useEffect(() => {
    let scrollTimeout
    const handleScroll = () => {
      if (open) return
      setIsWaving(true)

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsWaving(false)
      }, 300) // Stop waving 300ms after scrolling stops
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [open])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      })

      const data = await res.json()
      if (res.ok) {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }])
      } else {
        setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I am having trouble reaching our AI servers.' }])
      }
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, your internet connection may have dropped.' }])
    }
    setLoading(false)
  }

  // Modern 3D Human Avatar - just the raw avatar, no borders/circles
  const BotAvatar = ({ large = false, waving = false }) => (
    <div style={{
      width: large ? 'clamp(80px, 18vw, 120px)' : 36, 
      height: large ? 'clamp(80px, 18vw, 120px)' : 36,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      animation: waving ? 'waveBobble 1.2s ease-in-out infinite' : 'none',
      transformOrigin: 'bottom center', transition: 'transform 0.2s'
    }}>
      <img src="/avatar-transparent.png" alt="AI Agent" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
  )

  return (
    <div className={`chatbot-wrapper ${open ? 'chatbot-open' : ''}`}>
      <style dangerouslySetInnerHTML={{
        __html: `
        .chatbot-wrapper {
          position: fixed;
          bottom: clamp(12px, 4vw, 32px);
          right: clamp(12px, 4vw, 32px);
          z-index: 9999;
          transition: all 0.2s ease-in-out;
        }
        .chatbot-box {
          width: clamp(280px, calc(100vw - 24px), 380px);
          height: clamp(350px, 80dvh, 550px);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--card-shadow-hover);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        @media (max-width: 480px) {
          .chatbot-wrapper.chatbot-open {
            right: 12px !important;
            left: 12px !important;
            bottom: 12px !important;
          }
          .chatbot-box {
            width: 100% !important;
            height: 70dvh !important;
          }
          .chatbot-wrapper:not(.chatbot-open) {
            right: 12px !important;
            left: auto !important;
            bottom: 12px !important;
          }
        }
      `}} />
      {open ? (
        <div className="chatbot-box anim-fade-up">
          {/* Header */}
          <div style={{ background: 'var(--accent)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
            <div style={{ fontWeight: 400, fontFamily: 'Nunito, sans-serif', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, background: '#4ade80', borderRadius: '50%', boxShadow: '0 0 10px #4ade80' }}></div>
              John
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer', lineHeight: 1 }}>×</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-end', gap: 8,
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '90%'
              }}>
                {m.role === 'assistant' && <BotAvatar />}

                <div style={{
                  background: m.role === 'user' ? 'var(--accent)' : 'var(--bg-alt)',
                  color: m.role === 'user' ? '#fff' : 'var(--text)',
                  padding: '12px 16px', borderRadius: 14,
                  borderBottomRightRadius: m.role === 'user' ? 4 : 14,
                  borderBottomLeftRadius: m.role === 'assistant' ? 4 : 14,
                  fontSize: '0.9rem', lineHeight: 1.5,
                  boxShadow: 'var(--card-shadow)'
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="anim-fade-up" style={{ display: 'flex', alignItems: 'flex-end', gap: 8, alignSelf: 'flex-start' }}>
                <BotAvatar />
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--bg-alt)', padding: '8px 16px', borderRadius: 14, borderBottomLeftRadius: 4 }}>Typing...</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} style={{ borderTop: '1px solid var(--border)', padding: 16, display: 'flex' }}>
            <input
              value={input} onChange={e => setInput(e.target.value)}
              placeholder="Ask about our services..."
              style={{ flex: 1, padding: '12px 16px', borderRadius: 100, border: '1px solid var(--border)', outline: 'none', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.9rem' }}
            />
            <button type="submit" disabled={loading || !input.trim()} style={{
              background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 100, marginLeft: 8, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: loading || !input.trim() ? 0.5 : 1, transition: 'all 0.2s', flexShrink: 0
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          style={{
            background: 'transparent', border: 'none',
            cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
            padding: 0, outline: 'none', transition: 'transform 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
        >
           <div style={{
            background: 'var(--accent)',
            color: '#fff',
            fontSize: '0.75rem',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 700,
            padding: '5px 10px',
            borderRadius: 20,
            marginBottom: 6,
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            animation: 'waveBobble 2s ease-in-out infinite'
          }}>
            Hi! I&apos;m John. Ask me anything.
          </div>
          <div style={{ paddingRight: 10 }}>
            <BotAvatar large={true} waving={isWaving} />
          </div>
        </button>
      )}
    </div>
  )
}
