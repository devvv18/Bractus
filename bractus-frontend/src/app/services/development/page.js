"use client";
import { useState } from "react";
 
const offerings = [
  { icon: "📱", title: "Mobile App Development", desc: "iOS and Android apps built with React Native — one codebase, native performance, and a polished UX that users love." },
  { icon: "🌐", title: "Web Application Development", desc: "Scalable web apps using modern frameworks (Next.js, React, Node). From SaaS dashboards to customer-facing platforms." },
  { icon: "🎨", title: "UI/UX Design & Development", desc: "Product design that starts with user research and ends with pixel-perfect, accessible interfaces. Design and code in one team." },
  { icon: "🔌", title: "API & Integration Development", desc: "REST and GraphQL APIs, third-party integrations, and microservice layers that connect your entire ecosystem." },
  { icon: "🤖", title: "AI-Augmented Delivery", desc: "Our engineers direct AI agents through every phase — so you get senior-quality output at significantly faster timelines." },
  { icon: "🔒", title: "Security & Compliance", desc: "Secure-by-default architecture. SOC 2, HIPAA, and GDPR compliance built in from day one, not bolted on at the end." },
];
 
const stack = [
  { cat: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { cat: "Mobile", items: ["React Native", "Expo", "iOS", "Android"] },
  { cat: "Backend", items: ["Node.js", "Python", "Go", ".NET"] },
  { cat: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "Supabase"] },
  { cat: "Cloud", items: ["AWS", "Azure", "GCP", "Vercel"] },
  { cat: "DevOps", items: ["Docker", "Kubernetes", "GitHub Actions", "Terraform"] },
];
 
const process = [
  { step: "01", title: "Discovery & Scoping", desc: "We map out requirements, user flows, and technical constraints. You get a detailed spec before we write a line of code." },
  { step: "02", title: "Design Sprint", desc: "Wireframes, prototypes, and interactive mockups reviewed with your team until the UX is exactly right." },
  { step: "03", title: "Agile Development", desc: "Two-week sprints with working demos at every milestone. You always see the product in motion." },
  { step: "04", title: "QA & Launch", desc: "Automated testing, performance audits, and a staged rollout plan so launch day is a non-event." },
  { step: "05", title: "Post-Launch Support", desc: "We stay engaged — monitoring, hot-fixes, and continuous improvements after go-live." },
];
 
export default function DevelopmentPage() {
  const [activeQ, setActiveQ] = useState(null);
  const faqs = [
    { q: "Do you build web apps, mobile apps, or both?", a: "Both — often in the same engagement. Our cross-functional teams include web, mobile, and backend engineers so we can deliver a full product without stitching vendors together." },
    { q: "How do you ensure quality when AI is involved?", a: "AI doesn't replace our quality standards. Every AI-generated output goes through the same code review, testing, and approval process as human-written code. Senior engineers own architecture and final decisions." },
    { q: "What's a typical project timeline?", a: "An MVP typically takes 8–14 weeks from kickoff. We'll give you a precise timeline after the discovery sprint, and we've never missed a milestone without flagging it at least two sprints in advance." },
    { q: "Do we own the code?", a: "100%. Every line of code, design file, and documentation we produce is yours — no licensing fees, no lock-in." },
  ];
 
  return (
    <main style={{ minHeight: "100vh", background: "#f8f9fc", fontFamily: "'Inter', sans-serif", color: "#1a1f36" }}>
 
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #0f1b3d 0%, #1a3a6b 60%, #0f1b3d 100%)", padding: "110px 24px 90px", textAlign: "center" }}>
        <DotGrid />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "760px", margin: "0 auto" }}>
          <Pill>Development</Pill>
          <h1 style={{ fontSize: "clamp(34px,5.5vw,66px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, margin: "20px 0 22px" }}>
            Software Your Customers<br /><span style={{ color: "#60a5fa" }}>Actually Rely On</span>
          </h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: "40px" }}>
            Experienced engineers directing AI agents through every stage of development — web, mobile, APIs, and everything in between.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <CTABtn href="/contact" primary>Start a Project →</CTABtn>
            <CTABtn href="/case-studies">See Our Work</CTABtn>
          </div>
        </div>
      </section>
 
      {/* STATS */}
      <section style={{ background: "#fff", borderBottom: "1px solid #e8ecf4" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "36px 24px", display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: "24px", textAlign: "center" }}>
          {[["8–14 wks", "typical MVP timeline"], ["100%", "IP ownership — always"], ["0", "missed milestones without advance notice"], ["50+", "integrations out of the box"]].map(([num, label], i) => (
            <div key={i}>
              <div style={{ fontSize: "32px", fontWeight: 800, color: "#2563eb" }}>{num}</div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>
 
      {/* OFFERINGS */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <SectionLabel>What We Build</SectionLabel>
          <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>Full-stack delivery, end to end</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {offerings.map((o, i) => <ServiceCard key={i} {...o} />)}
          </div>
        </div>
      </section>
 
      {/* TECH STACK */}
      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <SectionLabel>Tech Stack</SectionLabel>
          <h2 style={{ fontSize: "28px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>Battle-tested technologies</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {stack.map((s, i) => (
              <div key={i} style={{ background: "#f8f9fc", borderRadius: "14px", padding: "20px 24px", border: "1px solid #e8ecf4" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "#2563eb", marginBottom: "10px" }}>{s.cat}</p>
                {s.items.map((item, j) => (
                  <div key={j} style={{ fontSize: "14px", color: "#374151", padding: "5px 0", borderBottom: j < s.items.length - 1 ? "1px solid #f3f4f6" : "none" }}>{item}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* PROCESS */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <SectionLabel>Our Process</SectionLabel>
          <h2 style={{ fontSize: "28px", fontWeight: 800, textAlign: "center", marginBottom: "52px" }}>How we build</h2>
          <div style={{ position: "relative" }}>
            {process.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: "24px", marginBottom: "36px", alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, width: "48px", height: "48px", borderRadius: "50%", background: "#eef2ff", border: "2px solid #c7d7fd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 800, color: "#2563eb" }}>{p.step}</div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "6px" }}>{p.title}</h3>
                  <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* FAQ */}
      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <SectionLabel>FAQ</SectionLabel>
          <h2 style={{ fontSize: "28px", fontWeight: 800, textAlign: "center", marginBottom: "40px" }}>Common questions</h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid #e8ecf4" }}>
              <button onClick={() => setActiveQ(activeQ === i ? null : i)} style={{ width: "100%", textAlign: "left", padding: "18px 0", background: "none", border: "none", cursor: "pointer", fontSize: "15px", fontWeight: 600, color: "#1a1f36", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {f.q} <span style={{ fontSize: "20px", color: "#2563eb", transform: activeQ === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </button>
              {activeQ === i && <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7, paddingBottom: "18px", margin: 0 }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </section>
 
      <BottomCTA title="Ready to start building?" sub="Tell us what you're working on — we'll scope it and get back to you within 48 hours." cta="Start a Project →" />
    </main>
  );
}

function Pill({ children }) { return <span style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", color: "#a8c4f8", borderRadius: "999px", padding: "6px 20px", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid rgba(168,196,248,0.3)" }}>{children}</span>; }
function CTABtn({ href, children, primary }) { return <a href={href} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 30px", borderRadius: "10px", fontSize: "15px", fontWeight: 700, textDecoration: "none", background: primary ? "#2563eb" : "rgba(255,255,255,0.1)", color: "#fff", border: primary ? "none" : "1px solid rgba(255,255,255,0.25)", boxShadow: primary ? "0 6px 24px rgba(37,99,235,0.4)" : "none" }}>{children}</a>; }
function SectionLabel({ children }) { return <p style={{ textAlign: "center", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563eb", marginBottom: "12px" }}>{children}</p>; }
function ServiceCard({ icon, title, desc }) { return <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", border: "1px solid #e8ecf4" }}><div style={{ fontSize: "28px", marginBottom: "14px" }}>{icon}</div><h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "10px" }}>{title}</h3><p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.65 }}>{desc}</p></div>; }
function BottomCTA({ title, sub, cta }) { return <section style={{ background: "linear-gradient(135deg,#0f1b3d 0%,#1a3a6b 100%)", padding: "80px 24px", textAlign: "center" }}><h2 style={{ fontSize: "32px", fontWeight: 800, color: "#fff", marginBottom: "14px" }}>{title}</h2><p style={{ color: "rgba(255,255,255,0.6)", fontSize: "17px", marginBottom: "36px" }}>{sub}</p><a href="/contact" style={{ display: "inline-block", background: "#2563eb", color: "#fff", borderRadius: "10px", padding: "16px 36px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}>{cta}</a></section>; }
function DotGrid() { const dots = Array.from({ length: 90 }, (_, i) => <div key={i} style={{ position: "absolute", width: `${Math.random()*3+2}px`, height: `${Math.random()*3+2}px`, borderRadius: "50%", background: `rgba(96,165,250,${Math.random()*0.45+0.1})`, top: `${Math.random()*100}%`, left: `${Math.random()*100}%` }} />); return <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>{dots}</div>; }
