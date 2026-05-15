'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const isReReveal =
          entry.target.classList.contains('reveal-right') ||
          entry.target.classList.contains('reveal-left');

        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          // Stop watching normal elements so they stay visible when scrolling up
          if (!isReReveal) {
            observer.unobserve(entry.target)
          }
        } else {
          // Only remove visible class for tool chips to allow re-triggering
          if (isReReveal) {
            entry.target.classList.remove('visible')
          }
        }
      })
    }, { threshold: 0.01, rootMargin: '40px' })

    const timeout = setTimeout(() => {
      const els = document.querySelectorAll(`
        section:not(:first-of-type) h1,
        section:not(:first-of-type) h2,
        section:not(:first-of-type) h3,
        section:not(:first-of-type) h4,
        section:not(:first-of-type) img,
        section:not(:first-of-type) p,
        section:not(:first-of-type) span.subtitle,
        section:not(:first-of-type) .tag,
        section:not(:first-of-type) span.tag,
        section:not(:first-of-type) button,
        section:not(:first-of-type) a.btn,
        section:not(:first-of-type) .btn-primary,
        section:not(:first-of-type) .btn-outline,
        section:not(:first-of-type) div > span:not(.tag),
        .card,
        .accordion,
        .footer-link
      `)

      els.forEach(el => {
        if (el.matches('h1, h2, h3, h4')) {
          el.classList.add('reveal', 'reveal-heading')
        } else if (el.matches('.tag, span.tag, span.subtitle')) {
          el.classList.add('reveal', 'reveal-tag')
        } else if (el.matches('img')) {
          el.classList.add('reveal', 'reveal-image')
        } else if (el.matches('div > span:not(.tag)')) {
          // Horizontal slide for tool chips
          el.classList.add('reveal', 'reveal-right')
        } else if (el.matches('button, a.btn, .btn-primary, .btn-outline')) {
          el.classList.add('reveal', 'reveal-button')
        } else {
          el.classList.add('reveal', 'reveal-text')
        }
        observer.observe(el)
      })
    }, 100)

    return () => {
      clearTimeout(timeout)
      observer.disconnect()
    }
  }, [pathname])

  return null
}