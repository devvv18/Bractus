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
          // Optional: stop observing once revealed so it doesn't animate out/in continuously
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.05, rootMargin: '0px' })

    // Give the DOM a tiny fraction of a second to render layout before binding
    const timeout = setTimeout(() => {
      // Select elements we want to slide up dynamically (cards, headers, paragraphs)
      // Exclude anything in the very first view (like hero sections) so they don't pop-in weirdly
      const els = document.querySelectorAll('section:not(:first-of-type) h2, section:not(:first-of-type) p:not(.hero-text), .card, .accordion')
      
      els.forEach(el => {
        el.classList.add('reveal')
        observer.observe(el)
      })
    }, 100)

    return () => {
      clearTimeout(timeout)
      observer.disconnect()
    }
  }, [pathname]) // Re-run if they change pages

  return null
}
