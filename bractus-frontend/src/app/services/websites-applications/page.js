"use client";
import { useState } from "react";
import Link from "next/link";
 
const offerings = [
  {
    icon: "🌐",
    title: "Responsive Web Apps",
    desc: "Mobile-first, high-performance web applications built with modern frameworks like Next.js and React. We focus on speed, SEO, and flawless user experience.",
  },
  {
    icon: "🛍️",
    title: "E-commerce Solutions",
    desc: "Custom storefronts and complex checkout flows designed to maximize conversion. We integrate with headless Shopify, Stripe, and custom backends.",
  },
  {
    icon: "🖥️",
    title: "Enterprise Portals",
    desc: "Secure, scalable internal tools and customer portals that streamline complex business workflows and data management.",
  },
  {
    icon: "📱",
    title: "Custom CMS",
    desc: "Headless CMS implementations that empower your marketing team to manage content without touching code, while keeping the site lightning fast.",
  },
  {
    icon: "⚡",
    title: "Performance Audits",
    desc: "We analyze and optimize slow-loading applications, improving Core Web Vitals and user retention within days.",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    desc: "User-centric design systems that ensure your digital product is as beautiful as it is functional and easy to use.",
  },
];
 
const process = [
  { step: "01", title: "Discovery", desc: "We map out your user journeys and business requirements to define the project scope." },
  { step: "02", title: "Design", desc: "Iterative UI/UX design with high-fidelity prototypes for your feedback and approval." },
  { step: "03", title: "Development", desc: "Clean, scalable code built in sprints with regular progress updates and demos." },
  { step: "04", title: "Launch", desc: "Seamless deployment with ongoing support to ensure your application runs flawlessly." },
];
 
export default function WebsitesApplicationsPage() {
  const [activeQ, setActiveQ] = useState(null);
  const contactEmail = process?.env?.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@bractus.com';
 
  const faqs = [
    { q: "Which technologies do you use?", a: "We primarily use Next.js, React, and TypeScript for the frontend, with Node.js or Python backends for maximum performance and scalability." },
    { q: "How long does a typical build take?", a: "A standard enterprise web app takes 8–12 weeks from discovery to launch, depending on the complexity of features." },
    { q: "Do you offer ongoing maintenance?", a: "Yes — we provide monthly support retainers to keep your application secure, updated, and optimized." },
    { q: "Can you modernize an existing application?", a: "Absolutely. We specialize in refactoring legacy codebases into modern, scalable architectures." },
  ];
 
  return (
    <main style={{ minHeight: "100vh", background: "#f8f9fc", fontFamily: "'Inter', sans-serif", color: "#1a1f36" }}>
 
      {/* HERO */}
      <section style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, #0f1b3d 0%, #1a3a6b 60%, #0f1b3d 100%)",
        padding: "110px 24px 90px", textAlign: "center",
      }}>
        <DotGrid />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "760px", margin: "0 auto" }}>
          <Pill>Development</Pill>
          <h1 style={{ fontSize: "clamp(34px,5.5vw,66px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, margin: "20px 0 22px" }}>
            Websites & Applications<br /><span style={{ color: "#60a5fa" }}>Built for Enterprise Scale</span>
          </h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: "40px" }}>
            Tailored digital experiences designed for scale. We build responsive, enterprise-grade web platforms and custom applications that drive user engagement.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <CTABtn href={`mailto:${contactEmail}?subject=Schedule%20a%20Call%20with%20Bractus&body=Hello%20Bractus%20Team%2C%0A%0AI%20would%20like%20to%20schedule%20a%20call%20to%20discuss%20how%20your%20technology%20services%20can%20help%20my%20organization.%0A%0ALooking%20forward%20to%20hearing%20from%20you%21`} primary>Schedule a Call →</CTABtn>
            <CTABtn href="/process">See Our Process</CTABtn>
          </div>
        </div>
      </section>
 
      {/* STAT BAR */}
      <section style={{ background: "#fff", borderBottom: "1px solid #e8ecf4" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "36px 24px", display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: "24px", textAlign: "center" }}>
          {[["20–40%", "avg. cost savings in 90 days"], ["5 days", "to first strategy report"], ["100%", "IP ownership — always"], ["5+", "successful founder exits"]].map(([num, label], i) => (
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
          <SectionLabel>What We Do</SectionLabel>
          <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>Advisory services that move the needle</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {offerings.map((o, i) => (
              <ServiceCard key={i} icon={o.icon} title={o.title} desc={o.desc} />
            ))}
          </div>
        </div>
      </section>
 
      {/* PROCESS */}
      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <SectionLabel>How It Works</SectionLabel>
          <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "52px" }}>From first call to ongoing partnership</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "32px" }}>
            {process.map((p, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#eef2ff", border: "2px solid #c7d7fd", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: "14px", fontWeight: 800, color: "#2563eb" }}>{p.step}</div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>{p.title}</h3>
                <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* QUOTE */}
      <section style={{ padding: "72px 24px", textAlign: "center", background: "linear-gradient(135deg,#eef2ff,#f0f9ff)" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div style={{ fontSize: "48px", color: "#2563eb", marginBottom: "16px" }}>"</div>
          <p style={{ fontSize: "20px", fontStyle: "italic", color: "#1a1f36", lineHeight: 1.7, marginBottom: "24px" }}>
            After building, scaling, and exiting five successful companies, we launched Bractus to bring entrepreneurial problem-solving to ambitious leaders.
          </p>
          <p style={{ fontWeight: 700, color: "#2563eb", fontSize: "14px" }}>— Bractus Founding Team</p>
        </div>
      </section>
 
      {/* FAQs */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <SectionLabel>FAQ</SectionLabel>
          <h2 style={{ fontSize: "28px", fontWeight: 800, textAlign: "center", marginBottom: "40px" }}>Common questions</h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid #e8ecf4", marginBottom: "0" }}>
              <button onClick={() => setActiveQ(activeQ === i ? null : i)}
                style={{ width: "100%", textAlign: "left", padding: "18px 0", background: "none", border: "none", cursor: "pointer", fontSize: "15px", fontWeight: 600, color: "#1a1f36", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {f.q} <span style={{ fontSize: "20px", color: "#2563eb", transition: "transform 0.2s", transform: activeQ === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {activeQ === i && <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7, paddingBottom: "18px", margin: 0 }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </section>
 
      {/* CTA */}
      <BottomCTA title="Ready to level up your technology strategy?" sub="Schedule a no-obligation call with our advisory team." cta="Schedule a Call →" contactEmail={contactEmail} />
    </main>
  );
}
 
/* ── shared sub-components ── */
function Pill({ children }) {
  return (
    <span style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", color: "#a8c4f8", borderRadius: "999px", padding: "6px 20px", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid rgba(168,196,248,0.3)" }}>
      {children}
    </span>
  );
}
function CTABtn({ href, children, primary }) {
  return (
    <a href={href} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 30px", borderRadius: "10px", fontSize: "15px", fontWeight: 700, textDecoration: "none", background: primary ? "#2563eb" : "rgba(255,255,255,0.1)", color: "#fff", border: primary ? "none" : "1px solid rgba(255,255,255,0.25)", boxShadow: primary ? "0 6px 24px rgba(37,99,235,0.4)" : "none" }}>
      {children}
    </a>
  );
}
function SectionLabel({ children }) {
  return <p style={{ textAlign: "center", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563eb", marginBottom: "12px" }}>{children}</p>;
}
function ServiceCard({ icon, title, desc }) {
  return (
    <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", border: "1px solid #e8ecf4", transition: "box-shadow 0.2s" }}>
      <div style={{ fontSize: "28px", marginBottom: "14px" }}>{icon}</div>
      <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "10px" }}>{title}</h3>
      <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
}
function BottomCTA({ title, sub, cta, contactEmail }) {
  return (
    <section style={{ background: "linear-gradient(135deg,#0f1b3d 0%,#1a3a6b 100%)", padding: "80px 24px", textAlign: "center" }}>
      <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#fff", marginBottom: "14px" }}>{title}</h2>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "17px", marginBottom: "36px" }}>{sub}</p>
      <a href={`mailto:${contactEmail}?subject=Schedule%20a%20Call%20with%20Bractus&body=Hello%20Bractus%20Team%2C%0A%0AI%20would%20like%20to%20schedule%20a%20call%20to%20discuss%20how%20your%20technology%20services%20can%20help%20my%20organization.%0A%0ALooking%20forward%20to%20hearing%20from%20you%21`} style={{ display: "inline-block", background: "#2563eb", color: "#fff", borderRadius: "10px", padding: "16px 36px", fontSize: "16px", fontWeight: 700, textDecoration: "none", boxShadow: "0 6px 24px rgba(37,99,235,0.4)" }}>{cta}</a>
    </section>
  );
}
function DotGrid() {
  const dots = Array.from({ length: 90 }, (_, i) => (
    <div key={i} style={{ position: "absolute", width: `${Math.random()*3+2}px`, height: `${Math.random()*3+2}px`, borderRadius: "50%", background: `rgba(96,165,250,${Math.random()*0.45+0.1})`, top: `${Math.random()*100}%`, left: `${Math.random()*100}%` }} />
  ));
  return <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>{dots}</div>;
}