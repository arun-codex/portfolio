"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const HLS_SRC =
  "https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8";

export function CodeNestHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let hls: import("hls.js").default | null = null;

    async function initHls() {
      const video = videoRef.current;
      if (!video) return;

      // Native HLS support (Safari)
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = HLS_SRC;
        return;
      }

      // Use hls.js for other browsers
      try {
        const Hls = (await import("hls.js")).default;
        if (Hls.isSupported()) {
          hls = new Hls({ enableWorker: false });
          hls.loadSource(HLS_SRC);
          hls.attachMedia(video);
        }
      } catch {
        // Silent fail — video is decorative
      }
    }

    initHls();

    return () => {
      hls?.destroy();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#070b0a" }}
    >
      {/* ── HLS Video Background ── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.6, zIndex: 0 }}
        aria-hidden="true"
      />

      {/* ── Left-to-right gradient overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(to right, #070b0a 0%, #070b0a 20%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* ── Bottom-up gradient for readability ── */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          zIndex: 1,
          height: "40%",
          background:
            "linear-gradient(to top, #070b0a 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Vertical grid lines (desktop only) ── */}
      <div
        className="cn-grid-line hidden md:block"
        style={{ left: "25%", zIndex: 2 }}
        aria-hidden="true"
      />
      <div
        className="cn-grid-line hidden md:block"
        style={{ left: "50%", zIndex: 2 }}
        aria-hidden="true"
      />
      <div
        className="cn-grid-line hidden md:block"
        style={{ left: "75%", zIndex: 2 }}
        aria-hidden="true"
      />

      {/* ── Central glow ellipse ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ top: "15%", zIndex: 2 }}
        aria-hidden="true"
      >
        <svg width="700" height="180" viewBox="0 0 700 180" fill="none">
          <defs>
            <filter id="cn-glow-blur">
              <feGaussianBlur stdDeviation="25" />
            </filter>
          </defs>
          <ellipse
            cx="350"
            cy="90"
            rx="320"
            ry="60"
            fill="url(#cn-glow-gradient)"
            filter="url(#cn-glow-blur)"
            opacity="0.55"
          />
          <defs>
            <radialGradient
              id="cn-glow-gradient"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#5ed29c" />
              <stop offset="55%" stopColor="#0f4a3a" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* ── Main content ── */}
      <div
        className="relative flex flex-col items-start justify-center min-h-screen px-8 md:px-16 lg:px-24 max-w-7xl mx-auto w-full"
        style={{ zIndex: 10 }}
      >
        {/* ── Liquid Glass Card ── */}
        <div
          className="cn-glass-card rounded-2xl p-5 mb-0 -translate-y-[50px]"
          style={{ width: 200, height: 200, flexShrink: 0 }}
        >
          {/* [ 2025 ] tag */}
          <p
            className="mb-3"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.08em",
            }}
          >
            [ 2025 ]
          </p>

          {/* Card headline */}
          <p
            className="mb-3 leading-snug"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 600,
              color: "#ffffff",
            }}
          >
            Taught by{" "}
            <em
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Industry
            </em>{" "}
            Professionals
          </p>

          {/* Card description */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.6,
            }}
          >
            Real-world curriculum built with top engineers from leading tech
            companies.
          </p>
        </div>

        {/* ── Eyebrow ── */}
        <p
          className="mb-4 font-bold uppercase tracking-widest"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 11,
            color: "#5ed29c",
            letterSpacing: "0.15em",
          }}
        >
          Career-Ready Curriculum
        </p>

        {/* ── Main Headline ── */}
        <h1
          className="font-extrabold uppercase tracking-tight leading-none mb-6"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(40px, 7vw, 72px)",
            color: "#ffffff",
            maxWidth: 780,
          }}
        >
          LAUNCH YOUR CODING CAREER
          <span style={{ color: "#5ed29c" }}>.</span>
        </h1>

        {/* ── Description ── */}
        <p
          className="mb-10 leading-relaxed"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: "rgba(255,255,255,0.7)",
            maxWidth: 512,
          }}
        >
          Master in-demand coding skills with structured, mentor-led courses
          designed to take you from zero to job-ready. Build real projects,
          earn certifications, and land your first role faster.
        </p>

        {/* ── CTA Button ── */}
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-bold uppercase text-sm transition-transform duration-200 hover:scale-[1.04]"
          style={{
            fontFamily: "'Inter', sans-serif",
            background: "#5ed29c",
            color: "#070b0a",
            textDecoration: "none",
            letterSpacing: "0.06em",
          }}
        >
          Get Started
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
