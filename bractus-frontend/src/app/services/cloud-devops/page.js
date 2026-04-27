"use client";
import { useState } from "react";
import Link from "next/link";
 
const offerings = [
  {
    icon: "☁️",
    title: "Infrastructure as Code",
    desc: "We use Terraform and CloudFormation to define your infrastructure, ensuring environment consistency and allowing you to spin up new regions in minutes.",
  },
  {
    icon: "🚀",
    title: "CI/CD Automation",
    desc: "Automated pipelines that test, build, and deploy your code with zero manual intervention. We help you move from weekly releases to daily deployments.",
  },
  {
    icon: "🛡️",
    title: "Cloud Security",
    desc: "Robust IAM policies, VPC design, and automated security scanning to ensure your enterprise data is protected against evolving threats.",
  },
  {
    icon: "📊",
    title: "Monitoring & Logging",
    desc: "Real-time visibility into your application health. We implement Datadog, CloudWatch, and ELK stacks to catch issues before your users do.",
  },
  {
    icon: "📉",
    title: "Cost Management",
    desc: "We audit your cloud spend to identify waste and implement auto-scaling and spot instance strategies that cut your monthly bill by 20-40%.",
  },
  {
    icon: "📦",
    title: "Containerization",
    desc: "Expert Kubernetes and Docker orchestration that allows your applications to run flawlessly across any cloud provider or on-prem environment.",
  },
];
 
const process = [
  { step: "01", title: "Audit", desc: "We perform a comprehensive review of your current cloud infrastructure, security, and deployment bottlenecks." },
  { step: "02", title: "Design", desc: "We architect a modern, cloud-native infrastructure plan focused on scalability, security, and cost-efficiency." },
  { step: "03", title: "Migration", desc: "Seamlessly transitioning your workloads to the new environment with minimal downtime and data integrity checks." },
  { step: "04", title: "Management", desc: "Ongoing monitoring and optimization to ensure your infrastructure evolves with your application needs." },
];
 
export default function CloudDevOpsPage() {
  const [activeQ, setActiveQ] = useState(null);
  const contactEmail = process?.env?.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@bractus.com';
 
  const faqs = [
    { q: "Which cloud providers do you support?", a: "We have deep expertise in AWS, Google Cloud Platform (GCP), and Microsoft Azure, as well as hybrid cloud environments." },
    { q: "How do you handle zero-downtime deployments?", a: "We implement Blue/Green or Canary deployment strategies that ensure your users never experience an outage during updates." },
    { q: "Can you help us reduce our AWS bill?", a: "Absolutely. Most clients see a 20-40% reduction in cloud costs within the first 60 days of our optimization engagement." },
    { q: "What is your approach to security?", a: "We follow the 'Least Privilege' principle and use automated tools to ensure your infrastructure remains compliant with SOC2 and GDPR." },
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
          <Pill>Infrastructure</Pill>
          <h1 style={{ fontSize: "clamp(34px,5.5vw,66px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, margin: "20px 0 22px" }}>
            Cloud & DevOps<br /><span style={{ color: "#60a5fa" }}>Reliability at Speed</span>
          </h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: "40px" }}>
            Accelerate delivery and ensure maximum reliability. We implement efficient CI/CD pipelines and design secure, highly available cloud environments.
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