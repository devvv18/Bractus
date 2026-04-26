"use client";
import { useState } from "react";
import Link from "next/link";
 
const features = [
  {
    icon: "⚡",
    title: "AI-Powered Insights",
    desc: "Get real-time performance analytics and personalized recommendations powered by advanced AI.",
  },
  {
    icon: "🔒",
    title: "Enterprise Security",
    desc: "SOC 2 compliant, end-to-end encrypted. Your data stays yours — always.",
  },
  {
    icon: "🚀",
    title: "Blazing Fast",
    desc: "Optimized for speed. Zero lag, instant sync, and offline-first architecture.",
  },
  {
    icon: "🤝",
    title: "Team Collaboration",
    desc: "Invite teammates, manage roles, and collaborate in real time across every project.",
  },
];
 
const steps = [
  { num: "01", label: "Click Download" },
  { num: "02", label: "Install in 60 seconds" },
  { num: "03", label: "Sign in or create account" },
  { num: "04", label: "Achieve new heights" },
];
 
export default function DownloadPage() {
  const [os, setOs] = useState("mac");
 
  const downloads = {
    mac: { label: "Download for macOS", sub: "macOS 12+ · Apple Silicon & Intel", ext: ".dmg" },
    windows: { label: "Download for Windows", sub: "Windows 10/11 · 64-bit", ext: ".exe" },
    linux: { label: "Download for Linux", sub: "Ubuntu 20.04+ / Debian", ext: ".deb" },
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
          textAlign: "center",
          background: "linear-gradient(135deg, #0f1b3d 0%, #1a3a6b 60%, #0f1b3d 100%)",
        }}
      >
        {/* Dot grid decoration */}
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
            For Developers
          </span>
 
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              margin: "0 auto 24px",
              maxWidth: "780px",
            }}
          >
            Achieve New Heights with{" "}
            <span style={{ color: "#60a5fa" }}>Bractus</span>
          </h1>
 
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.7)",
              maxWidth: "520px",
              margin: "0 auto 48px",
              lineHeight: 1.7,
            }}
          >
            The all-in-one developer toolkit that supercharges your workflow —
            from code to deployment, all in one place.
          </p>
 
          {/* OS Selector */}
          <div
            style={{
              display: "inline-flex",
              background: "rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "4px",
              marginBottom: "28px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {["mac", "windows", "linux"].map((o) => (
              <button
                key={o}
                onClick={() => setOs(o)}
                style={{
                  padding: "10px 24px",
                  borderRadius: "9px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                  transition: "all 0.2s",
                  background: os === o ? "#ffffff" : "transparent",
                  color: os === o ? "#1a1f36" : "rgba(255,255,255,0.6)",
                  textTransform: "capitalize",
                }}
              >
                {o === "mac" ? "🍎" : o === "windows" ? "🪟" : "🐧"} {o.charAt(0).toUpperCase() + o.slice(1)}
              </button>
            ))}
          </div>
 
          <br />
 
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              background: "#2563eb",
              color: "#fff",
              borderRadius: "12px",
              padding: "18px 40px",
              fontSize: "17px",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 8px 32px rgba(37,99,235,0.45)",
              transition: "all 0.2s",
            }}
          >
            ⬇ {downloads[os].label}
          </a>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", marginTop: "12px" }}>
            {downloads[os].sub} · Free to start
          </p>
        </div>
      </section>
 
      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "56px", color: "#1a1f36" }}>
          Up and running in minutes
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "32px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {steps.map((s, i) => (
            <div key={i} style={{ flex: "1 1 180px", maxWidth: "200px", textAlign: "center" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "#eef2ff",
                  border: "2px solid #c7d7fd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  fontSize: "15px",
                  fontWeight: 800,
                  color: "#2563eb",
                }}
              >
                {s.num}
              </div>
              <p style={{ fontWeight: 600, fontSize: "15px", color: "#1a1f36" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── FEATURES ── */}
      <section
        style={{
          background: "#fff",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "56px" }}>
            Everything you need to build better, faster
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "28px",
            }}
          >
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  background: "#f8f9fc",
                  borderRadius: "16px",
                  padding: "28px",
                  border: "1px solid #e8ecf4",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>{f.icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>{f.title}</h3>
                <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6 }}>{f.desc}</p>
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
        <h2 style={{ fontSize: "36px", fontWeight: 800, color: "#fff", marginBottom: "16px" }}>
          Ready to level up?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "36px", fontSize: "17px" }}>
          Join thousands of developers who ship faster with Bractus.
        </p>
        <a
          href="#"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background: "#2563eb",
            color: "#fff",
            borderRadius: "10px",
            padding: "16px 36px",
            fontSize: "16px",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          ⬇ Download Free
        </a>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", marginTop: "12px" }}>
          No credit card required · Available on Mac, Windows & Linux
        </p>
      </section>
    </main>
  );
}
 
/* ── Decorative dot grid ── */
function DotGrid() {
  const dots = [];
  for (let i = 0; i < 120; i++) {
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