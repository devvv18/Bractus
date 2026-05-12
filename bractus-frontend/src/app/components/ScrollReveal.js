'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.05, rootMargin: '0px' })

    const timeout = setTimeout(() => {
      const els = document.querySelectorAll(`
        section:not(:first-of-type) h1,
        section:not(:first-of-type) h2,
        section:not(:first-of-type) h3,
        section:not(:first-of-type) h4,
        section:not(:first-of-type) img,
        section:not(:first-of-type) p:not(.hero-text),
        section:not(:first-of-type) span.subtitle,
        section:not(:first-of-type) button,
        section:not(:first-of-type) a.btn,
        .card,
        .accordion
      `)

      els.forEach(el => {
        // Tag element type so CSS can apply different delays
        if (el.matches('h1, h2, h3, h4')) {
          el.classList.add('reveal', 'reveal-heading')
        } else if (el.matches('img')) {
          el.classList.add('reveal', 'reveal-image')
        } else if (el.matches('button, a.btn')) {
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