'use client'
import { useState, useEffect } from 'react'
import Loader from './Loader'

export default function LayoutWrapper({ children }) {
  // Always start loading — shows on every page refresh
  const [loading, setLoading] = useState(true)

  // Force scroll to top on initial page load / refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0 })
  }, [])

  const handleFinish = () => {
    window.scrollTo({ top: 0 })
    setLoading(false)
  }

  return (
    <>
      {loading && <Loader onFinish={handleFinish} />}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transform: loading ? 'scale(0.96) translateY(20px)' : 'scale(1) translateY(0px)',
          transition: 'opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1), transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
          minHeight: '100vh',
          width: '100%',
          overflowX: 'hidden',
          position: 'relative'
        }}
      >
        {children}
      </div>
    </>
  )
}
