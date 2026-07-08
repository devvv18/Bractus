'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Reusable fade-in wrapper ───────────────────────────────────────────────
function Reveal({ children, delay = 0, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ─── Section wrapper ────────────────────────────────────────────────────────
function Section({ children, style }) {
  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid #e5e7eb', ...style }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 32px' }}>
        {children}
      </div>
    </section>
  )
}

// ─── Inline label ───────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <div style={{
      display: 'inline-block',
      fontSize: '0.7rem',
      fontWeight: 600,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: '#6b7280',
      marginBottom: 20,
    }}>
      {children}
    </div>
  )
}

// ─── Divider ────────────────────────────────────────────────────────────────
function Divider() {
  return <div style={{ height: 1, background: '#e5e7eb', margin: '48px 0' }} />
}

// ─── Code block ─────────────────────────────────────────────────────────────
function Code({ children }) {
  return (
    <pre style={{
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: 8,
      padding: '20px 24px',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      fontSize: '0.82rem',
      lineHeight: 1.85,
      color: '#374151',
      overflowX: 'auto',
      whiteSpace: 'pre',
      margin: '20px 0',
    }}>
      {children}
    </pre>
  )
}

// ─── Comparison row ─────────────────────────────────────────────────────────
function CompareRow({ label, before, after, isLast }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '200px 1fr 1fr',
      gap: 0,
      borderBottom: isLast ? 'none' : '1px solid #e5e7eb',
    }}>
      <div style={{ padding: '14px 16px', fontSize: '0.82rem', color: '#6b7280', fontWeight: 500, borderRight: '1px solid #e5e7eb' }}>
        {label}
      </div>
      <div style={{ padding: '14px 16px', fontSize: '0.82rem', color: '#ef4444', borderRight: '1px solid #e5e7eb', lineHeight: 1.5 }}>
        {before}
      </div>
      <div style={{ padding: '14px 16px', fontSize: '0.82rem', color: '#16a34a', lineHeight: 1.5 }}>
        {after}
      </div>
    </div>
  )
}

// ─── Priority row ───────────────────────────────────────────────────────────
function PriorityRow({ priority, feature, files, effort, isLast }) {
  const colors = { High: '#dc2626', Medium: '#d97706', Low: '#2563eb', Future: '#6b7280' }
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '90px 1fr 1fr 80px',
      gap: 0,
      borderBottom: isLast ? 'none' : '1px solid #e5e7eb',
    }}>
      <div style={{ padding: '12px 16px', borderRight: '1px solid #e5e7eb' }}>
        <span style={{
          fontSize: '0.72rem', fontWeight: 600, color: colors[priority],
          textTransform: 'uppercase', letterSpacing: '0.1em',
        }}>{priority}</span>
      </div>
      <div style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#111827', borderRight: '1px solid #e5e7eb', lineHeight: 1.5 }}>{feature}</div>
      <div style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#6b7280', fontFamily: "'JetBrains Mono', monospace", borderRight: '1px solid #e5e7eb', lineHeight: 1.6 }}>{files}</div>
      <div style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#6b7280' }}>{effort}</div>
    </div>
  )
}

// ─── Feature block ──────────────────────────────────────────────────────────
function FeatureBlock({ title, description, technique, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      style={{
        borderLeft: '2px solid #111827',
        paddingLeft: 24,
        marginBottom: 40,
      }}
    >
      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.8, marginBottom: 10 }}>{description}</div>
      <div style={{ fontSize: '0.78rem', color: '#9ca3af', fontStyle: 'italic' }}>
        Framer Motion API: <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#6b7280', fontStyle: 'normal' }}>{technique}</span>
      </div>
    </motion.div>
  )
}

// ─── Concept block ──────────────────────────────────────────────────────────
function ConceptBlock({ title, description, example, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      style={{ marginBottom: 52 }}
    >
      <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', marginBottom: 10 }}>{title}</div>
      <div style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.85, marginBottom: 16 }}>{description}</div>
      <Code>{example}</Code>
    </motion.div>
  )
}

// ─── Main page ──────────────────────────────────────────────────────────────
export default function LusionPOC() {
  return (
    <div style={{
      background: '#ffffff',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      color: '#111827',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Navigation */}
      <nav style={{
        position: 'sticky', top: 0,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e5e7eb',
        zIndex: 100,
        padding: '0 32px',
      }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827' }}>
            Bractus — Framer Motion POC
          </span>
          <div style={{ display: 'flex', gap: 28 }}>
            {[
              { label: 'Overview', href: '#overview' },
              { label: 'Lusion Analysis', href: '#lusion' },
              { label: 'Core Concepts', href: '#concepts' },
              { label: 'Implementation', href: '#implementation' },
              { label: 'Roadmap', href: '#roadmap' },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{ fontSize: '0.8rem', color: '#6b7280', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = '#111827'}
                onMouseLeave={e => e.target.style.color = '#6b7280'}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Cover */}
      <div style={{ padding: '100px 32px 80px', borderBottom: '1px solid #e5e7eb', background: '#fafafa' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <Reveal>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 24 }}>
              Proof of Concept — Internal Document
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2, color: '#111827', margin: '0 0 24px', letterSpacing: '-0.02em' }}>
              Upgrading the Bractus Website with Framer Motion
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: '1.05rem', color: '#4b5563', lineHeight: 1.85, maxWidth: 680, marginBottom: 48 }}>
              This document outlines how Framer Motion — a production-grade React animation library — can be adopted to elevate the interaction quality of the Bractus website, using lusion.co as the visual and technical benchmark.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
              {[
                { label: 'Reference', value: 'lusion.co' },
                { label: 'Library', value: 'Framer Motion v12' },
                { label: 'Framework', value: 'Next.js 14' },
                { label: 'Status', value: 'Dependency Installed' },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4, fontWeight: 600 }}>{item.label}</div>
                  <div style={{ fontSize: '0.9rem', color: '#111827', fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Overview ─────────────────────────────────────────────────────────── */}
      <Section style={{ borderTop: 'none' }}>
        <div id="overview">
          <Reveal><Label>Section 01 — Overview</Label></Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: 20, letterSpacing: '-0.01em' }}>
              What is Framer Motion
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.9, marginBottom: 24 }}>
              Framer Motion is a declarative animation library for React, maintained by the Framer team. It extends standard HTML and SVG elements into animatable counterparts through a simple prop-based API. Rather than writing CSS keyframes or managing timers manually, developers declare what the start state, end state, and transition behaviour should be — and Framer Motion handles the interpolation.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.9, marginBottom: 24 }}>
              The library ships with a spring physics engine, which means animations can behave like physical objects with mass, stiffness, and damping. This produces the organic, fluid feel seen on award-winning sites like lusion.co — something that cannot be replicated with CSS transitions alone.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.9 }}>
              Framer Motion is already listed as a dependency in the Bractus frontend project at version 12.40.0. No additional installation is required. The work described in this document concerns integration and usage strategy, not setup.
            </p>
          </Reveal>

          <Divider />

          <Reveal>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: 20, letterSpacing: '-0.01em' }}>
              Why the Current Approach Has Limits
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.9, marginBottom: 32 }}>
              The Bractus site currently achieves scroll reveals through an IntersectionObserver utility (ScrollReveal.js) that toggles CSS class names. Load animations use predefined CSS keyframes with hardcoded delay classes. While functional, this approach has several structural limitations.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ padding: '10px 16px', fontSize: '0.72rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', borderRight: '1px solid #e5e7eb' }}>Capability</div>
                <div style={{ padding: '10px 16px', fontSize: '0.72rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', borderRight: '1px solid #e5e7eb' }}>Current (CSS + IntersectionObserver)</div>
                <div style={{ padding: '10px 16px', fontSize: '0.72rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>With Framer Motion</div>
              </div>
              {[
                { label: 'Spring physics', before: 'Not available', after: 'Built-in — stiffness, damping, mass' },
                { label: 'Exit animations', before: 'Not possible in React', after: 'AnimatePresence handles unmount' },
                { label: 'Scroll-driven values', before: 'Requires manual JS', after: 'useScroll + useTransform' },
                { label: 'Stagger orchestration', before: 'Manual delay classes', after: 'staggerChildren in variants' },
                { label: 'Gesture animations', before: 'Event listeners + CSS', after: 'whileHover, whileTap, drag' },
                { label: 'Page transitions', before: 'Hard cut between routes', after: 'AnimatePresence on pathname key', isLast: true },
              ].map((row, i) => (
                <CompareRow key={i} {...row} />
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Lusion Analysis ──────────────────────────────────────────────────── */}
      <Section>
        <div id="lusion">
          <Reveal><Label>Section 02 — Lusion Analysis</Label></Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: 20, letterSpacing: '-0.01em' }}>
              How lusion.co Uses Animation
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.9, marginBottom: 48 }}>
              Lusion is an award-winning 3D and interactive web studio. Its website serves as the benchmark for this POC. The following is a breakdown of the interaction techniques observed on the site, mapped to the specific Framer Motion primitives that would be used to replicate or adapt them.
            </p>
          </Reveal>

          {[
            {
              title: 'Spring-Physics Cursor',
              description: 'The native OS cursor is replaced with two custom elements — a small dot that tracks the pointer instantly, and a larger blob that follows with a spring lag. On hover over interactive elements, the blob scales up and its blend mode inverts the colours beneath it. The effect communicates that the interface is alive and responsive to the user.',
              technique: 'useMotionValue, useSpring, mix-blend-mode: difference',
            },
            {
              title: 'Split-Text Heading Reveals',
              description: "Every primary heading is split into individual words. Each word sits inside an overflow:hidden container. On page load or scroll entry, the word slides up from below the clip boundary. Words in the same heading animate in sequence. This creates the impression that text is being revealed from behind a stage curtain — a signature typographic effect on award-winning agency sites.",
              technique: 'motion.span, useInView, variants with staggerChildren',
            },
            {
              title: 'Mouse-Driven Parallax Layers',
              description: 'The hero section contains multiple depth layers that respond to the mouse position in real time. Background elements move subtly, while foreground elements move more aggressively. The mouse coordinates are normalised to a -1 to 1 scale and then mapped to CSS transform values through useTransform. Spring smoothing is applied to each layer so the response feels physical, not linear.',
              technique: 'useMotionValue, useTransform, useSpring — multiple layers at different intensities',
            },
            {
              title: 'Scroll-Pinned Horizontal Strip',
              description: "The work portfolio section pins vertically while the user scrolls. The vertical scroll progress is read and mapped to a horizontal X translation, creating the illusion of horizontal movement through cards. The section reserves enough scroll height to accommodate the full horizontal range. This technique requires no JS scroll listeners — it is entirely declarative.",
              technique: 'useScroll (target + offset), useTransform, position: sticky',
            },
            {
              title: 'Scroll-Driven Parallax Sections',
              description: 'Individual sections move at different rates as the user scrolls. This creates a sense of depth between content blocks. Foreground text moves faster than background imagery. The scroll progress for each section is tracked independently using a ref attached to that section.',
              technique: "useScroll with target ref, useTransform, offset: ['start end', 'end start']",
            },
            {
              title: 'Page and View Transitions',
              description: 'When navigating between pages, the outgoing page plays an exit animation before the incoming page mounts. React normally destroys elements on unmount, preventing exit animations. AnimatePresence intercepts this, runs the exit, and then unmounts. The same mechanism is used for menus, modals, and any element that conditionally renders.',
              technique: "AnimatePresence with mode='wait', keyed on pathname",
            },
            {
              title: 'Magnetic Button Interaction',
              description: "The call-to-action button physically pulls toward the cursor when the pointer is nearby. As the mouse approaches, the button's position shifts a percentage of the distance between the cursor and the button's centre. On mouse leave, spring physics return the button to its origin. This makes CTAs feel tactile and draws attention to key conversion actions.",
              technique: 'useSpring, useMotionValue, onMouseMove delta calculation',
            },
          ].map((f, i) => (
            <FeatureBlock key={i} index={i} {...f} />
          ))}
        </div>
      </Section>

      {/* ── Core Concepts ────────────────────────────────────────────────────── */}
      <Section>
        <div id="concepts">
          <Reveal><Label>Section 03 — Core Concepts</Label></Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: 20, letterSpacing: '-0.01em' }}>
              Framer Motion Primitives
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.9, marginBottom: 48 }}>
              Every technique described in Section 02 is built from a small set of composable primitives. The following documents each primitive, its purpose, and how it would be used in the Bractus context.
            </p>
          </Reveal>

          {[
            {
              title: 'motion.* — Animatable Elements',
              description: 'The motion namespace turns any HTML or SVG element into a Framer Motion component. It accepts initial, animate, exit, and transition props. This is the entry point for all declarative animations and replaces the current pattern of toggling CSS class names via IntersectionObserver.',
              example:
`// Replaces: <h2 className="reveal reveal-heading">
// With a declarative, physics-aware equivalent

import { motion } from 'framer-motion'

<motion.h2
  initial={{ opacity: 0, y: 32 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.75,
    ease: [0.22, 1, 0.36, 1]   // Lusion's signature cubic bezier
  }}
>
  We Build Complex Software Systems
</motion.h2>`,
            },
            {
              title: 'Variants — Named Animation States',
              description: 'Variants allow animation states to be named and reused. A parent component can propagate its animation state down to all children, enabling orchestration without prop drilling. The staggerChildren option in the transition object staggers each child by a defined interval — this is what creates the sequential card and badge reveal effect seen on lusion.co.',
              example:
`const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,   // 100ms between each child
      delayChildren: 0.2,
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
}

// Parent propagates "visible" state to all children
<motion.div variants={container} initial="hidden" animate="visible">
  <motion.div variants={item}>Service One</motion.div>
  <motion.div variants={item}>Service Two</motion.div>
  <motion.div variants={item}>Service Three</motion.div>
</motion.div>`,
            },
            {
              title: 'useInView — Scroll-Triggered Reveals',
              description: 'useInView is the Framer Motion equivalent of IntersectionObserver. It returns a boolean that is true when the attached element enters the viewport. The margin option lets the trigger fire before the element is fully visible, producing the smooth pre-emptive reveal effect seen on agency sites. Using useInView directly in components replaces the centralised ScrollReveal.js utility and makes each component self-contained.',
              example:
`import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function ServiceCard({ title, description }) {
  const ref = useRef(null)
  // Fires 60px before element enters viewport, once only
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  )
}`,
            },
            {
              title: 'useScroll + useTransform — Scroll-Driven Animation',
              description: 'useScroll tracks the scroll position of the page or a specific element as a MotionValue between 0 and 1. useTransform maps that progress to any CSS-compatible value. Combined, they power parallax effects, scroll-progress indicators, section pinning, and the horizontal scroll strip. The offset option defines when tracking begins and ends relative to the target element and viewport.',
              example:
`import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

function ParallaxSection() {
  const ref = useRef(null)

  // scrollYProgress goes 0 → 1 as section passes through viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Map scroll progress to a vertical shift
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} style={{ overflow: 'hidden' }}>
      <motion.div style={{ y }}>
        Background layer — moves at a different rate
      </motion.div>
    </section>
  )
}`,
            },
            {
              title: 'useSpring — Physics-Based Smoothing',
              description: 'useSpring wraps any MotionValue and applies spring physics, producing a lagged, momentum-based response. This is what makes the custom cursor blob feel like it has weight, and what makes parallax layers feel like they are floating rather than snapping. stiffness controls responsiveness — higher values react faster. damping controls overshoot — lower values bounce more.',
              example:
`import { useMotionValue, useSpring, motion } from 'framer-motion'
import { useEffect } from 'react'

function SpringCursor() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Apply spring physics — the blob lags behind the real pointer
  const blobX = useSpring(mouseX, { stiffness: 80, damping: 18 })
  const blobY = useSpring(mouseY, { stiffness: 80, damping: 18 })

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <motion.div
      style={{ x: blobX, y: blobY, position: 'fixed', pointerEvents: 'none' }}
    />
  )
}`,
            },
            {
              title: 'AnimatePresence — Exit Animations',
              description: 'React unmounts components immediately when a condition becomes false or a route changes, making exit animations impossible. AnimatePresence wraps a conditional or routed subtree and intercepts the unmount cycle. The element plays its exit animation, then is removed from the DOM. This is essential for page transitions in Next.js and for menu, modal, and drawer interactions.',
              example:
`'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

// In LayoutWrapper.js — wraps the entire application
export default function LayoutWrapper({ children }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}              // key change triggers transition
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}`,
            },
            {
              title: 'animate() — Imperative Animation',
              description: 'The animate function provides imperative control outside the declarative component model. It is useful for cases that cannot be expressed with props alone — such as counting numbers up when an element enters the viewport, or sequencing animations that depend on runtime values. It returns controls with stop() so animations can be cancelled on unmount.',
              example:
`import { animate, useMotionValue, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function StatCounter({ target, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, target, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return controls.stop
  }, [inView])

  return <span ref={ref}>{display}{suffix}</span>
}`,
            },
          ].map((c, i) => (
            <ConceptBlock key={i} index={i} {...c} />
          ))}
        </div>
      </Section>

      {/* ── Implementation Strategy ──────────────────────────────────────────── */}
      <Section>
        <div id="implementation">
          <Reveal><Label>Section 04 — Implementation Strategy</Label></Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: 20, letterSpacing: '-0.01em' }}>
              How to Apply This to Bractus
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.9, marginBottom: 48 }}>
              The upgrade path is designed to be incremental. Each step is independently deployable and does not require a rebuild of other sections. Teams can work through the steps in priority order without blocking each other.
            </p>
          </Reveal>

          {[
            {
              step: '01',
              title: 'Page Transitions via LayoutWrapper',
              description: 'This is the single highest-impact change. LayoutWrapper.js currently renders children directly with no transition. Wrapping the content in AnimatePresence keyed on the Next.js pathname will produce a smooth fade and slide transition between every page on the site. This change requires editing one file and has zero risk to existing components.',
              note: 'File: src/app/components/LayoutWrapper.js — add AnimatePresence keyed on usePathname()',
            },
            {
              step: '02',
              title: 'Replace Hero.js Class Animations with Variants',
              description: 'The Hero section uses anim-fade-up, anim-delay-2, and anim-delay-3 CSS classes. These hardcoded delays are fragile and cannot respond to scroll state. Replacing them with a motion variants container and staggerChildren produces the same visual result but with physics-based easing and a single configuration point. The ParticleGrid canvas is unaffected — it sits below the motion layer.',
              note: 'File: src/app/components/Hero.js — replace className animation classes with motion.* variants',
            },
            {
              step: '03',
              title: 'Migrate Scroll Reveals from ScrollReveal.js',
              description: 'ScrollReveal.js selects elements globally using document.querySelectorAll and applies CSS classes. This creates a coupling between the utility and the class names used in every component. Migrating to useInView inside each component decouples the animation logic, makes components individually testable, and allows per-component configuration of timing, easing, and offset.',
              note: 'Files: Services.js, About.js, Process.js, ContactForm.js — add useInView per section heading and card',
            },
            {
              step: '04',
              title: 'Stagger Service and Process Cards',
              description: 'The services grid and process steps are currently rendered without orchestration — they either all appear at once or each triggers separately via the global scroll observer. Using a variants container with staggerChildren ensures the cards animate in sequence, creating the progressive reveal seen on lusion.co. Each card also receives a whileHover scale and lift animation using spring physics.',
              note: 'Files: Services.js, Process.js — wrap grid with motion variants container',
            },
            {
              step: '05',
              title: 'Replace Counter Animation with animate()',
              description: 'The Hero section counts statistics up using setInterval. This is replaced with the animate() function from Framer Motion, which provides declarative control over the duration, easing, and update callback. The count only starts when the stats container enters the viewport, triggered by useInView.',
              note: 'File: src/app/components/Hero.js — replace setInterval counter logic with animate()',
            },
            {
              step: '06',
              title: 'Add Custom Cursor (Global)',
              description: 'A new CustomCursor component is created and added to layout.js so it is active across the entire application. The component renders a spring-physics blob that tracks the pointer. On desktop, the native cursor is hidden. On mobile and touch devices, the component renders nothing. This is the defining visual characteristic of premium agency sites.',
              note: 'New file: src/app/components/CustomCursor.js — imported in src/app/layout.js',
            },
            {
              step: '07',
              title: 'Add Scroll-Driven Parallax to Key Sections',
              description: 'Selected sections — particularly the Hero and the ecosystem banner — gain a depth layer using useScroll and useTransform. A background element within each section moves at a slower rate than the foreground text, creating a sense of dimension without any 3D library or WebGL. This is a purely CSS transform-based technique.',
              note: 'Files: Hero.js, ContactForm.js (EcosystemBanner) — add useScroll parallax layers',
            },
            {
              step: '08',
              title: 'Magnetic CTAs',
              description: 'The primary call-to-action buttons — "Schedule a call" and "Let\'s talk" — are upgraded to use spring-physics magnetic behaviour. A reusable MagneticButton component is created and used wherever high-conversion CTAs appear. The magnetic pull is subtle (35% of cursor distance) and returns to origin immediately on mouse leave.',
              note: 'New file: src/app/components/MagneticButton.js — used in Hero.js and GetInTouch section',
            },
          ].map((step, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div style={{ marginBottom: 44, paddingBottom: 44, borderBottom: i < 7 ? '1px solid #f3f4f6' : 'none' }}>
                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#d1d5db', letterSpacing: '0.15em', minWidth: 24, marginTop: 3 }}>{step.step}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', marginBottom: 10 }}>{step.title}</div>
                    <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.85, marginBottom: 12 }}>{step.description}</p>
                    <div style={{ fontSize: '0.78rem', color: '#9ca3af', fontFamily: "'JetBrains Mono', monospace", paddingLeft: 12, borderLeft: '2px solid #e5e7eb' }}>
                      {step.note}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Technical Notes ──────────────────────────────────────────────────── */}
      <Section>
        <Reveal><Label>Section 05 — Technical Notes</Label></Reveal>
        <Reveal delay={0.05}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: 20, letterSpacing: '-0.01em' }}>
            Performance and Easing Reference
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.9, marginBottom: 32 }}>
            Framer Motion defaults to animating transform and opacity — the only two CSS properties that trigger GPU compositing without causing layout recalculation. This means all animations described in this document will run on the compositor thread and will not block the main thread, even under heavy JavaScript load.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.9, marginBottom: 24 }}>
            The cubic bezier used throughout lusion.co for easing is a fast-in, exponential-out curve. It produces the sensation of elements snapping into place decisively. This should be adopted as the standard transition easing for Bractus.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <Code>{`// Standard easing — to be used for all reveal and entrance transitions
ease: [0.22, 1, 0.36, 1]

// Equivalent in CSS (for reference only — use Framer Motion, not CSS)
// transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1)

// Recommended spring presets by use case
// Cursor and parallax — slow, weighted response
{ stiffness: 80, damping: 18 }

// Card hover, button lift — snappy but not jarring
{ stiffness: 300, damping: 25 }

// Scroll progress smoothing
{ stiffness: 100, damping: 30 }`}</Code>
        </Reveal>

        <Divider />

        <Reveal>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: 20, letterSpacing: '-0.01em' }}>
            What Framer Motion Does Not Cover
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.9, marginBottom: 24 }}>
            Lusion's background is a custom WebGL canvas powered by Three.js with bespoke GLSL shaders. Framer Motion is strictly a UI animation library — it handles DOM elements and does not interface with WebGL or canvas rendering. The Three.js and @react-three/fiber packages already in the Bractus project are the relevant tools for that layer. Framer Motion manages everything above the canvas — text, cards, navigation, and UI transitions.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.9 }}>
            The smooth scroll inertia seen on lusion.co (the momentum scrolling effect) is achieved with a separate library — Lenis by Studio Freight, which is also already installed in the Bractus project as @studio-freight/lenis. This does not conflict with Framer Motion; the two libraries address separate layers of the interaction stack.
          </p>
        </Reveal>
      </Section>

      {/* ── Roadmap ──────────────────────────────────────────────────────────── */}
      <Section>
        <div id="roadmap">
          <Reveal><Label>Section 06 — Roadmap</Label></Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: 20, letterSpacing: '-0.01em' }}>
              Implementation Roadmap
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.9, marginBottom: 40 }}>
              Steps are ordered by impact-to-effort ratio. High priority items deliver visible improvement immediately and require minimal changes to existing code. Lower priority items add premium detail and require new shared components.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr 80px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ padding: '10px 16px', fontSize: '0.72rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', borderRight: '1px solid #e5e7eb' }}>Priority</div>
                <div style={{ padding: '10px 16px', fontSize: '0.72rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', borderRight: '1px solid #e5e7eb' }}>Feature</div>
                <div style={{ padding: '10px 16px', fontSize: '0.72rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', borderRight: '1px solid #e5e7eb' }}>Files</div>
                <div style={{ padding: '10px 16px', fontSize: '0.72rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Effort</div>
              </div>
              {[
                { priority: 'High', feature: 'Page transitions', files: 'LayoutWrapper.js', effort: '30 min' },
                { priority: 'High', feature: 'Hero entrance animations', files: 'Hero.js', effort: '1 hr' },
                { priority: 'High', feature: 'Scroll reveals (useInView)', files: 'All section components', effort: '2 hr' },
                { priority: 'Medium', feature: 'Service and process card stagger', files: 'Services.js, Process.js', effort: '1 hr' },
                { priority: 'Medium', feature: 'Counter animation (animate())', files: 'Hero.js', effort: '30 min' },
                { priority: 'Low', feature: 'Custom cursor (global)', files: 'CustomCursor.js, layout.js', effort: '1 hr' },
                { priority: 'Low', feature: 'Magnetic CTA buttons', files: 'MagneticButton.js, Hero.js', effort: '45 min' },
                { priority: 'Future', feature: 'Mouse parallax hero layers', files: 'Hero.js', effort: '2 hr' },
                { priority: 'Future', feature: 'Scroll-driven parallax sections', files: 'Hero.js, ContactForm.js', effort: '2 hr' },
                { priority: 'Future', feature: 'Horizontal scroll work strip', files: 'New component', effort: '3 hr', isLast: true },
              ].map((row, i) => (
                <PriorityRow key={i} {...row} />
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #e5e7eb', padding: '40px 32px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
            Bractus — Framer Motion POC Document — Internal Use Only
          </div>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
            Reference: lusion.co — framer.com/motion — github.com/framer/motion
          </div>
        </div>
      </div>
    </div>
  )
}
