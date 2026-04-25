"use client";
import { useState } from "react";
 
const offerings = [
  { icon: "🗄️", title: "Data Engineering & Pipelines", desc: "Robust ETL/ELT pipelines that move, clean, and transform data from every source — in real time or batch — so your analysts always have fresh, trusted data." },
  { icon: "📊", title: "Analytics & BI Platforms", desc: "We implement and configure Looker, Metabase, Tableau, or custom dashboards that turn raw numbers into decisions your leadership can act on." },
  { icon: "🤖", title: "Machine Learning Models", desc: "Predictive models, recommendation engines, anomaly detectors — built, trained, and deployed by experienced ML engineers, not just data scientists." },
  { icon: "🧠", title: "AI Agent Integration", desc: "AI agents that query your data, surface insights in plain English, and trigger downstream workflows — cutting analyst time on routine reports by 70%+." },
  { icon: "🏛️", title: "Data Governance & Quality", desc: "Data catalogs, lineage tracking, and quality monitoring so you can trust every number in every report." },
  { icon: "☁️", title: "Cloud Data Warehousing", desc: "Snowflake, BigQuery, or Redshift architectures designed for performance and cost — with automatic partitioning and query optimization built in." },
];
 
const useCases = [
  { industry: "SaaS", use: "Churn prediction model that identifies at-risk accounts 30 days before cancellation, giving CS teams a head start." },
  { industry: "E-commerce", use: "Real-time recommendation engine that increased average order value by 22% within 60 days of deployment." },
  { industry: "Healthcare", use: "HIPAA-compliant data warehouse unifying EHR, billing, and outcomes data for a regional health system." },
  { industry: "Fintech", use: "Fraud detection pipeline processing 50K transactions/minute with sub-100ms latency and 99.4% accuracy." },
];
 
const stack = [
  { cat: "Warehousing", items: ["Snowflake", "BigQuery", "Redshift", "DuckDB"] },
  { cat: "Pipelines", items: ["dbt", "Airflow", "Fivetran", "Spark"] },
  { cat: "ML / AI", items: ["Python", "scikit-learn", "PyTorch", "MLflow"] },
  { cat: "BI & Viz", items: ["Looker", "Metabase", "Tableau", "Grafana"] },
];
 
export default function DataSciencePage() {
  const [activeQ, setActiveQ] = useState(null);
  const faqs = [
    { q: "Do we need to have clean data before you start?", a: "No — data cleaning and pipeline work is usually where we begin. Most clients have useful data that just isn't in a usable form yet. We assess, clean, and structure it as part of the engagement." },
    { q: "How long before we see results?", a: "Most clients have their first working dashboard or pipeline within 3–4 weeks. ML models typically take 6–10 weeks to train, validate, and deploy to production." },
    { q: "What if we don't have a data team internally?", a: "That's common. We build the infrastructure, document everything, and offer ongoing managed services — or we train your team so they can own it." },
    { q: "How do you handle sensitive or regulated data?", a: "HIPAA, GDPR, SOC 2 — we've done it all. Encryption at rest and in transit, role-based access, full audit logs, and data minimization are standard practice in every engagement." },
  ];
 
  return (
    <main style={{ minHeight: "100vh", background: "#f8f9fc", fontFamily: "'Inter', sans-serif", color: "#1a1f36" }}>
 
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #0f1b3d 0%, #1a3a6b 60%, #0f1b3d 100%)", padding: "110px 24px 90px", textAlign: "center" }}>
        <DotGrid />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "760px", margin: "0 auto" }}>
          <Pill>Data Science</Pill>
          <h1 style={{ fontSize: "clamp(34px,5.5vw,66px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, margin: "20px 0 22px" }}>
            Insights Your Team<br /><span style={{ color: "#60a5fa" }}>Can Actually Act On</span>
          </h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: "40px" }}>
            Data engineering and analytics powered by experienced analysts and AI agents that surface the insights humans alone would miss.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <CTABtn href="/contact" primary>Talk to a Data Engineer →</CTABtn>
            <CTABtn href="/case-studies">See Case Studies</CTABtn>
          </div>
        </div>
      </section>
 
      {/* METRICS */}
      <section style={{ background: "#fff", borderBottom: "1px solid #e8ecf4" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "36px 24px", display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: "24px", textAlign: "center" }}>
          {[["70%+", "reduction in routine reporting time"], ["3–4 wks", "to first working dashboard"], ["99.4%", "ML model accuracy (fintech fraud)"], ["100%", "data ownership — always yours"]].map(([num, label], i) => (
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
          <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>From raw data to real decisions</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {offerings.map((o, i) => <ServiceCard key={i} {...o} />)}
          </div>
        </div>
      </section>
 
      {/* USE CASES */}
      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <SectionLabel>Real Results</SectionLabel>
          <h2 style={{ fontSize: "28px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>What this looks like in practice</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "20px" }}>
            {useCases.map((u, i) => (
              <div key={i} style={{ background: "#f8f9fc", borderRadius: "14px", padding: "24px 28px", border: "1px solid #e8ecf4", display: "flex", gap: "16px" }}>
                <div style={{ flexShrink: 0, background: "#eef2ff", borderRadius: "8px", padding: "8px 14px", height: "fit-content", fontSize: "12px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.06em" }}>{u.industry}</div>
                <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.65, margin: 0 }}>{u.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* TECH STACK */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <SectionLabel>Our Stack</SectionLabel>
          <h2 style={{ fontSize: "28px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>Best-in-class data tooling</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px" }}>
            {stack.map((s, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "14px", padding: "20px 24px", border: "1px solid #e8ecf4" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "#2563eb", marginBottom: "10px" }}>{s.cat}</p>
                {s.items.map((item, j) => (
                  <div key={j} style={{ fontSize: "14px", color: "#374151", padding: "5px 0", borderBottom: j < s.items.length - 1 ? "1px solid #f3f4f6" : "none" }}>{item}</div>
                ))}
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
 
      <BottomCTA title="Turn your data into your biggest advantage" sub="Talk to our data team — we'll show you what's possible with what you already have." cta="Talk to a Data Engineer →" />
    </main>
  );
}
 
function Pill({ children }) { return <span style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", color: "#a8c4f8", borderRadius: "999px", padding: "6px 20px", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid rgba(168,196,248,0.3)" }}>{children}</span>; }
function CTABtn({ href, children, primary }) { return <a href={href} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 30px", borderRadius: "10px", fontSize: "15px", fontWeight: 700, textDecoration: "none", background: primary ? "#2563eb" : "rgba(255,255,255,0.1)", color: "#fff", border: primary ? "none" : "1px solid rgba(255,255,255,0.25)", boxShadow: primary ? "0 6px 24px rgba(37,99,235,0.4)" : "none" }}>{children}</a>; }
function SectionLabel({ children }) { return <p style={{ textAlign: "center", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563eb", marginBottom: "12px" }}>{children}</p>; }
function ServiceCard({ icon, title, desc }) { return <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", border: "1px solid #e8ecf4" }}><div style={{ fontSize: "28px", marginBottom: "14px" }}>{icon}</div><h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "10px" }}>{title}</h3><p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.65 }}>{desc}</p></div>; }
function BottomCTA({ title, sub, cta }) { return <section style={{ background: "linear-gradient(135deg,#0f1b3d 0%,#1a3a6b 100%)", padding: "80px 24px", textAlign: "center" }}><h2 style={{ fontSize: "32px", fontWeight: 800, color: "#fff", marginBottom: "14px" }}>{title}</h2><p style={{ color: "rgba(255,255,255,0.6)", fontSize: "17px", marginBottom: "36px" }}>{sub}</p><a href="/contact" style={{ display: "inline-block", background: "#2563eb", color: "#fff", borderRadius: "10px", padding: "16px 36px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}>{cta}</a></section>; }
function DotGrid() { const dots = Array.from({ length: 90 }, (_, i) => <div key={i} style={{ position: "absolute", width: `${Math.random()*3+2}px`, height: `${Math.random()*3+2}px`, borderRadius: "50%", background: `rgba(96,165,250,${Math.random()*0.45+0.1})`, top: `${Math.random()*100}%`, left: `${Math.random()*100}%` }} />); return <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>{dots}</div>; }
