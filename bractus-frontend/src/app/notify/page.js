"use client";
import { useState } from "react";
 
const benefits = [
  { icon: "🏢", title: "Team Dashboards", desc: "Unified visibility into every project, sprint, and milestone across your entire org." },
  { icon: "📈", title: "Performance Analytics", desc: "Deep insights into team velocity, bottlenecks, and output quality — at a glance." },
  { icon: "🔗", title: "Seamless Integrations", desc: "Plug into your existing stack: Slack, Jira, GitHub, and 50+ tools out of the box." },
  { icon: "🛡️", title: "Enterprise SSO & RBAC", desc: "Centralized authentication, granular permissions, and full audit logs." },
  { icon: "🤖", title: "AI Team Assistant", desc: "An AI layer that surfaces blockers, suggests assignments, and drafts status updates." },
  { icon: "📞", title: "Dedicated Success Manager", desc: "A human expert in your corner — from onboarding through scale." },
];
 
const stages = [
  { label: "Private Beta", status: "done", desc: "Closed testing with 12 partner companies" },
  { label: "Open Beta", status: "active", desc: "Expanding to early-access waitlist" },
  { label: "General Availability", status: "upcoming", desc: "Full launch for all organizations" },
];
 
export default function NotifyMePage() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [size, setSize] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const handleSubmit = async () => {
    if (!email || !company) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };
 
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8f9fc",
        fontFamily: "'Inter', sans-serif",
        color: "#1a1f36",
      }}
    >
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "120px 24px 100px",
          background: "linear-gradient(135deg, #0f1b3d 0%, #1a3a6b 60%, #0f1b3d 100%)",
          textAlign: "center",
        }}
      >
        <DotGrid />
        <div style={{ position: "relative", zIndex: 2 }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.1)",
              color: "#a8c4f8",
              borderRadius: "999px",
              padding: "6px 20px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "28px",
              border: "1px solid rgba(168,196,248,0.3)",
            }}
          >
            For Organizations · Coming Soon
          </span>
 
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 68px)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              margin: "0 auto 24px",
              maxWidth: "800px",
            }}
          >
            Level Up Your{" "}
            <span style={{ color: "#60a5fa" }}>Entire Team</span>
          </h1>
 
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.7)",
              maxWidth: "540px",
              margin: "0 auto 16px",
              lineHeight: 1.7,
            }}
          >
            Bractus for Organizations brings enterprise-grade collaboration,
            AI-powered analytics, and seamless integrations — built for the
            teams that ship the future.
          </p>
 
          <p style={{ color: "#60a5fa", fontWeight: 600, fontSize: "15px", marginBottom: "0" }}>
            🚀 Open Beta launching soon — secure your early access below
          </p>
        </div>
      </section>
 
      {/* ── SIGN-UP FORM ── */}
      <section style={{ padding: "80px 24px", maxWidth: "560px", margin: "0 auto" }}>
        {submitted ? (
          <div
            style={{
              textAlign: "center",
              background: "#fff",
              borderRadius: "20px",
              padding: "56px 40px",
              boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
              border: "1px solid #e8ecf4",
            }}
          >
            <div style={{ fontSize: "56px", marginBottom: "20px" }}>🎉</div>
            <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "12px" }}>
              You're on the list!
            </h2>
            <p style={{ color: "#6b7280", lineHeight: 1.7 }}>
              We'll reach out to <strong>{email}</strong> as soon as Bractus for
              Organizations is ready for <strong>{company}</strong>. Expect early
              access perks and priority onboarding.
            </p>
            <div
              style={{
                marginTop: "32px",
                background: "#eef2ff",
                borderRadius: "12px",
                padding: "16px 24px",
                fontSize: "14px",
                color: "#3730a3",
                fontWeight: 600,
              }}
            >
              📅 We'll be in touch within 48 hours
            </div>
          </div>
        ) : (
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "48px 40px",
              boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
              border: "1px solid #e8ecf4",
            }}
          >
            <h2 style={{ fontSize: "26px", fontWeight: 800, marginBottom: "8px", textAlign: "center" }}>
              Get Early Access
            </h2>
            <p
              style={{
                color: "#6b7280",
                fontSize: "15px",
                textAlign: "center",
                marginBottom: "36px",
                lineHeight: 1.6,
              }}
            >
              Join the waitlist and be among the first teams to experience
              Bractus for Organizations.
            </p>
 
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Field
                label="Work Email *"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@company.com"
              />
              <Field
                label="Company Name *"
                type="text"
                value={company}
                onChange={setCompany}
                placeholder="Acme Corp"
              />
 
              <div>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
                  Team Size
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1.5px solid #e5e7eb",
                    fontSize: "14px",
                    color: size ? "#1a1f36" : "#9ca3af",
                    background: "#fff",
                    outline: "none",
                  }}
                >
                  <option value="">Select team size</option>
                  <option value="1-10">1–10 people</option>
                  <option value="11-50">11–50 people</option>
                  <option value="51-200">51–200 people</option>
                  <option value="200+">200+ people</option>
                </select>
              </div>
 
              <button
                onClick={handleSubmit}
                disabled={loading || !email || !company}
                style={{
                  marginTop: "8px",
                  padding: "16px",
                  borderRadius: "10px",
                  border: "none",
                  background: !email || !company ? "#e5e7eb" : "#2563eb",
                  color: !email || !company ? "#9ca3af" : "#fff",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: !email || !company ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                }}
              >
                {loading ? "Submitting…" : "🔔 Notify Me"}
              </button>
            </div>
 
            <p style={{ textAlign: "center", fontSize: "12px", color: "#9ca3af", marginTop: "20px" }}>
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        )}
      </section>
 
      {/* ── ROADMAP ── */}
      <section style={{ padding: "0 24px 80px", maxWidth: "680px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "26px", fontWeight: 800, textAlign: "center", marginBottom: "40px" }}>
          Where we are
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {stages.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              {/* Line + dot */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "24px" }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background:
                      s.status === "done"
                        ? "#22c55e"
                        : s.status === "active"
                        ? "#2563eb"
                        : "#d1d5db",
                    border:
                      s.status === "active"
                        ? "3px solid #bfdbfe"
                        : "none",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                />
                {i < stages.length - 1 && (
                  <div
                    style={{
                      width: "2px",
                      height: "52px",
                      background:
                        s.status === "done"
                          ? "#86efac"
                          : "#e5e7eb",
                    }}
                  />
                )}
              </div>
              <div style={{ paddingBottom: "40px" }}>
                <p style={{ fontWeight: 700, fontSize: "15px", margin: "0 0 4px" }}>
                  {s.label}{" "}
                  {s.status === "active" && (
                    <span
                      style={{
                        background: "#dbeafe",
                        color: "#1d4ed8",
                        fontSize: "11px",
                        padding: "2px 8px",
                        borderRadius: "999px",
                        fontWeight: 700,
                        verticalAlign: "middle",
                      }}
                    >
                      NOW
                    </span>
                  )}
                  {s.status === "done" && (
                    <span style={{ color: "#22c55e", fontSize: "13px" }}> ✓</span>
                  )}
                </p>
                <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── BENEFITS GRID ── */}
      <section
        style={{
          background: "#fff",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "56px" }}>
            Built for how modern teams work
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {benefits.map((b, i) => (
              <div
                key={i}
                style={{
                  background: "#f8f9fc",
                  borderRadius: "16px",
                  padding: "28px",
                  border: "1px solid #e8ecf4",
                }}
              >
                <div style={{ fontSize: "30px", marginBottom: "12px" }}>{b.icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>{b.title}</h3>
                <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── BOTTOM CTA ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f1b3d 0%, #1a3a6b 100%)",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "34px", fontWeight: 800, color: "#fff", marginBottom: "14px" }}>
          Don't miss the launch
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "17px", marginBottom: "36px" }}>
          Early access teams get 3 months free + a dedicated onboarding session.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "16px 36px",
            fontSize: "16px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          🔔 Join the Waitlist
        </button>
      </section>
    </main>
  );
}
 
/* ── Reusable input field ── */
function Field({ label, type, value, onChange, placeholder }) {
  return (
    <div>
      <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "10px",
          border: "1.5px solid #e5e7eb",
          fontSize: "14px",
          outline: "none",
          boxSizing: "border-box",
          color: "#1a1f36",
        }}
      />
    </div>
  );
}
 
/* ── Decorative dot grid ── */
function DotGrid() {
  const dots = [];
  for (let i = 0; i < 100; i++) {
    dots.push(
      <div
        key={i}
        style={{
          position: "absolute",
          width: `${Math.random() * 4 + 2}px`,
          height: `${Math.random() * 4 + 2}px`,
          borderRadius: "50%",
          background: `rgba(96,165,250,${Math.random() * 0.5 + 0.1})`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
      />
    );
  }
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {dots}
    </div>
  );
}
 