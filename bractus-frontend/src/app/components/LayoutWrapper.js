'use client'
import { useState } from 'react'
import Loader from './Loader'

export default function LayoutWrapper({ children }) {
  // Always start loading — shows on every page refresh
  const [loading, setLoading] = useState(true)

  const handleFinish = () => setLoading(false)

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
        }}
      >
        {children}
      </div>
    </>
  )
}
