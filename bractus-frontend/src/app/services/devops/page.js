"use client";
import { useState } from "react";
 
const offerings = [
  { icon: "☁️", title: "Cloud Infrastructure Design", desc: "Production-grade AWS, Azure, or GCP architectures designed for your scale — VPCs, IAM, networking, and compute all locked down from day one." },
  { icon: "🔄", title: "CI/CD Pipeline Implementation", desc: "GitHub Actions, GitLab CI, or Jenkins pipelines that automate testing, security scanning, and deployment — so your team ships without fear." },
  { icon: "🐳", title: "Containerization & Orchestration", desc: "Docker and Kubernetes setups that make your services portable, scalable, and self-healing — with Helm charts and production-ready configs." },
  { icon: "📊", title: "Monitoring & Alerting", desc: "Datadog, Grafana, or PagerDuty setups with SLO-based alerts so you know about problems before your users do." },
  { icon: "🔒", title: "Security & Compliance", desc: "Infrastructure hardening, secret management (Vault, AWS SSM), and compliance automation for SOC 2, HIPAA, and GDPR." },
  { icon: "☁️", title: "Cloud Migration", desc: "Lift-and-shift or cloud-native refactors. We migrate monoliths, databases, and legacy systems with zero unplanned downtime." },
];
 
const metrics = [
  ["60%", "avg. reduction in deployment time"],
  ["99.9%", "SLA target we design for"],
  ["< 24h", "mean time to recovery post-incident"],
  ["$0", "unplanned downtime during migrations"],
];
 
const tools = [
  { cat: "Cloud", items: ["AWS", "Azure", "GCP", "Cloudflare"] },
  { cat: "IaC", items: ["Terraform", "Pulumi", "AWS CDK", "Ansible"] },
  { cat: "Containers", items: ["Docker", "Kubernetes", "Helm", "ArgoCD"] },
  { cat: "CI/CD", items: ["GitHub Actions", "GitLab CI", "Jenkins", "CircleCI"] },
  { cat: "Monitoring", items: ["Datadog", "Grafana", "Prometheus", "PagerDuty"] },
  { cat: "Security", items: ["Vault", "AWS SSM", "Snyk", "Trivy"] },
];
 
export default function DevOpsPage() {
  const [activeQ, setActiveQ] = useState(null);
  const faqs = [
    { q: "Can you work with our existing cloud setup?", a: "Yes. We start with an audit of your current infrastructure, identify risks and inefficiencies, and produce an improvement roadmap before touching anything in production." },
    { q: "How do you handle zero-downtime deployments?", a: "We use blue-green or canary deployment strategies backed by automated smoke tests and instant rollback mechanisms. Deployments are events you can push during business hours." },
    { q: "Do you manage infrastructure long-term?", a: "We offer both: a one-time build-and-handoff model (with thorough documentation and knowledge transfer) and an ongoing managed infrastructure retainer." },
    { q: "How do you cut deployment time by 60%?", a: "Typically through parallelised test suites, caching layers in the pipeline, and eliminating manual approval gates. We audit your current pipeline first and show you the exact levers." },
  ];
 
  return (
    <main style={{ minHeight: "100vh", background: "#f8f9fc", fontFamily: "'Inter', sans-serif", color: "#1a1f36" }}>
 
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #0f1b3d 0%, #1a3a6b 60%, #0f1b3d 100%)", padding: "110px 24px 90px", textAlign: "center" }}>
        <DotGrid />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "760px", margin: "0 auto" }}>
          <Pill>DevOps & Cloud</Pill>
          <h1 style={{ fontSize: "clamp(34px,5.5vw,66px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, margin: "20px 0 22px" }}>
            Infrastructure Built for<br /><span style={{ color: "#60a5fa" }}>Speed and Reliability</span>
          </h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: "40px" }}>
            Cloud infrastructure and CI/CD pipelines designed for speed — with AI-augmented automation that cuts deployment time and eliminates manual bottlenecks.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <CTABtn href="/contact" primary>Get an Infrastructure Audit →</CTABtn>
            <CTABtn href="/process">Our Process</CTABtn>
          </div>
        </div>
      </section>
 
      {/* METRICS */}
      <section style={{ background: "#fff", borderBottom: "1px solid #e8ecf4" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "36px 24px", display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: "24px", textAlign: "center" }}>
          {metrics.map(([num, label], i) => (
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
          <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>DevOps that ships faster, fails less</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {offerings.map((o, i) => <ServiceCard key={i} {...o} />)}
          </div>
        </div>
      </section>
 
      {/* PIPELINE VISUAL */}
      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <SectionLabel>How It Flows</SectionLabel>
          <h2 style={{ fontSize: "28px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>A pipeline that ships confidence</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0", alignItems: "center" }}>
            {["Code Push", "Lint & Test", "Security Scan", "Build Image", "Deploy (Canary)", "Monitor & Rollback"].map((stage, i, arr) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ background: i % 2 === 0 ? "#eef2ff" : "#f0fdf4", border: `1px solid ${i % 2 === 0 ? "#c7d7fd" : "#bbf7d0"}`, borderRadius: "10px", padding: "12px 18px", textAlign: "center", minWidth: "110px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: i % 2 === 0 ? "#2563eb" : "#16a34a", letterSpacing: "0.06em", textTransform: "uppercase" }}>{`0${i + 1}`}</div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#1a1f36", marginTop: "4px" }}>{stage}</div>
                </div>
                {i < arr.length - 1 && <div style={{ width: "24px", textAlign: "center", color: "#9ca3af", fontSize: "18px", flexShrink: 0 }}>→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* TOOLING */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <SectionLabel>Tooling</SectionLabel>
          <h2 style={{ fontSize: "28px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>We work with the tools you already use</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {tools.map((s, i) => (
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
 
      <BottomCTA title="Let's audit your infrastructure" sub="We'll find the bottlenecks and show you exactly how to fix them — no commitment required." cta="Get a Free Audit →" />
    </main>
  );
}
 
function Pill({ children }) { return <span style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", color: "#a8c4f8", borderRadius: "999px", padding: "6px 20px", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid rgba(168,196,248,0.3)" }}>{children}</span>; }
function CTABtn({ href, children, primary }) { return <a href={href} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 30px", borderRadius: "10px", fontSize: "15px", fontWeight: 700, textDecoration: "none", background: primary ? "#2563eb" : "rgba(255,255,255,0.1)", color: "#fff", border: primary ? "none" : "1px solid rgba(255,255,255,0.25)", boxShadow: primary ? "0 6px 24px rgba(37,99,235,0.4)" : "none" }}>{children}</a>; }
function SectionLabel({ children }) { return <p style={{ textAlign: "center", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563eb", marginBottom: "12px" }}>{children}</p>; }
function ServiceCard({ icon, title, desc }) { return <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", border: "1px solid #e8ecf4" }}><div style={{ fontSize: "28px", marginBottom: "14px" }}>{icon}</div><h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "10px" }}>{title}</h3><p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.65 }}>{desc}</p></div>; }
function BottomCTA({ title, sub, cta }) { return <section style={{ background: "linear-gradient(135deg,#0f1b3d 0%,#1a3a6b 100%)", padding: "80px 24px", textAlign: "center" }}><h2 style={{ fontSize: "32px", fontWeight: 800, color: "#fff", marginBottom: "14px" }}>{title}</h2><p style={{ color: "rgba(255,255,255,0.6)", fontSize: "17px", marginBottom: "36px" }}>{sub}</p><a href="/contact" style={{ display: "inline-block", background: "#2563eb", color: "#fff", borderRadius: "10px", padding: "16px 36px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}>{cta}</a></section>; }
function DotGrid() { const dots = Array.from({ length: 90 }, (_, i) => <div key={i} style={{ position: "absolute", width: `${Math.random()*3+2}px`, height: `${Math.random()*3+2}px`, borderRadius: "50%", background: `rgba(96,165,250,${Math.random()*0.45+0.1})`, top: `${Math.random()*100}%`, left: `${Math.random()*100}%` }} />); return <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>{dots}</div>; }
