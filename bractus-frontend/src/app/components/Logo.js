'use client'
import Link from 'next/link'
import { logoConfig } from '../logo-config'

/**
 * Logo Component
 * A central place to manage the Bractus branding.
 * Modify logo-config.js to update the logo across the entire application.
 * 
 * @param {string} variant - 'nav' or 'footer' (affects styling)
 */
export default function Logo({ variant = 'nav' }) {
  const isFooter = variant === 'footer'
  const { type, imageSrc, imageWidth, imageHeight, letter, text, showText } = logoConfig
  
  return (
    <Link href="/" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: isFooter ? 10 : 12, 
      textDecoration: 'none',
      transition: 'opacity 0.2s'
    }}
    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
    >
      {type === 'image' ? (
        /* Image Logo */
        (() => {
          const finalWidth = imageWidth
          const finalHeight = imageHeight
          const finalMarginLeft = logoConfig.imageMarginLeft || 0
          const filterStyle = isFooter ? 'brightness(0) invert(1)' : 'none'

          return (
            <img 
              src={imageSrc} 
              alt={text} 
              className={isFooter ? '' : 'logo-image-nav'}
              style={{ 
                width: finalWidth, 
                height: finalHeight, 
                objectFit: 'contain',
                marginLeft: finalMarginLeft,
                filter: filterStyle
              }}
            />
          )
        })()
      ) : (
        /* Text/Letter Logo Icon */
        <div style={{
          width: isFooter ? 34 : 36, 
          height: isFooter ? 34 : 36, 
          borderRadius: 8,
          background: 'var(--accent)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontFamily: 'Nunito, sans-serif', 
          fontWeight: 400, 
          fontSize: isFooter ? 16 : 18, 
          color: '#fff',
          boxShadow: isFooter ? 'none' : '0 4px 12px rgba(47, 84, 150, 0.25)'
        }}>
          {letter}
        </div>
      )}

      {/* Logo Text */}
      {showText && (
        <span style={{
          fontFamily: 'Nunito, sans-serif', 
          fontWeight: 400,
          fontSize: isFooter ? '1.15rem' : '1.25rem', 
          color: isFooter ? '#f1f5f9' : 'var(--text)', 
          letterSpacing: '-0.02em',
          textTransform: 'uppercase'
        }}>
          {text}
        </span>
      )}
    </Link>
  )
}
