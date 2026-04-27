'use client'
import { useState } from 'react'
import Link from 'next/link'

const SERVICES = [
  {
    title: 'Websites & Applications',
    items: ['Custom Web Platforms', 'Mobile Application Development', 'UI/UX Design & Prototyping', 'API Design & Integration'],
    href: '/services/websites-applications',
  },
  {
    title: 'Full-Stack Engineering',
    items: ['End-to-End System Development', 'Microservices Architecture', 'Legacy System Modernization', 'Quality Assurance & Automated Testing'],
    href: '/services/full-stack-engineering',
  },
  {
    title: 'System Architecture (Advisory)',
    items: ['Fractional CTO Services', 'Technical Due Diligence', 'Infrastructure Audits & Cost Optimization', 'Scalability & Security Planning'],
    href: '/services/system-architecture',
  },
  {
    title: 'AI & Machine Learning',
    items: ['AI Strategy & Implementation', 'Custom LLMs & Generative AI', 'Intelligent Chatbots & Agents', 'Predictive Logic Models'],
    href: '/services/ai-machine-learning',
  },
  {
    title: 'Cloud & DevOps',
    items: ['Cloud Infrastructure Design', 'CI/CD Pipeline Automation', 'Cloud Migration & Deployment', 'System Monitoring & Performance Tuning'],
    href: '/services/cloud-devops',
  },
  {
    title: 'Data Engineering',
    items: ['Data Pipelines & ETL', 'Data Warehousing & Migration', 'Data Governance & Security', 'Advanced Analytics & BI'],
    href: '/services/data-engineering',
  },
]

export default function Services() {
  return (
    <section id="services" className="section" style={{ background: 'var(--bg)', paddingTop: 0 }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="tag" style={{ marginBottom: 16 }}>OUR EXPERTISE</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, marginBottom: 16 }}>
            Scale your <span className="accent-text">vision</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 700, margin: '0 auto', lineHeight: 1.7 }}>
            We bring strategic architecture to every project. From modernizing mission-critical infrastructure to developing AI-driven platforms, our team delivers technical excellence.
          </p>
        </div>

        {/* 6 Block Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px' 
        }}>
          {SERVICES.map((service, index) => (
            <ServiceBlock key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceBlock({ title, items, href }) {
  const [hovered, setHovered] = useState(false)
  
  return (
    <Link 
      href={href}
      className="card"
      style={{
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px',
        transition: 'all 0.3s ease',
        borderColor: hovered ? 'var(--accent)' : 'var(--border)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        height: '100%',
        background: 'var(--surface)'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: 500, 
        color: 'var(--text)', 
        marginBottom: '20px',
        fontFamily: 'Nunito, sans-serif'
      }}>
        {title}
      </h3>
      
      <ul style={{ 
        listStyle: 'none', 
        padding: 0, 
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {items.map((item, i) => (
          <li key={i} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            fontSize: '0.95rem',
            color: 'var(--text-secondary)'
          }}>
            <span style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>•</span>
            {item}
          </li>
        ))}
      </ul>

      <div style={{ 
        marginTop: 'auto', 
        paddingTop: '24px',
        color: 'var(--accent)',
        fontSize: '0.9rem',
        fontWeight: 500,
        opacity: hovered ? 1 : 0.7,
        transition: 'opacity 0.2s'
      }}>
        View Details →
      </div>
    </Link>
  )
}