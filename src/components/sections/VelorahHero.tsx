"use client";

export function VelorahHero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Fullscreen Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40 py-[90px]">
        <h1
          className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] font-normal max-w-7xl"
          style={{
            fontFamily: "'Instrument Serif', serif",
            letterSpacing: "-2.46px",
            color: "var(--text-primary)",
          }}
        >
          Where <em className="not-italic" style={{ color: "var(--text-secondary)" }}>dreams</em>{" "}
          rise{" "}
          <em className="not-italic" style={{ color: "var(--text-secondary)" }}>
            through the silence.
          </em>
        </h1>

        <p
          className="animate-fade-rise-delay text-base sm:text-lg max-w-2xl mt-8 leading-relaxed"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          We&apos;re designing tools for deep thinkers, bold creators, and quiet rebels. Amid the
          chaos, we build digital spaces for sharp focus and inspired work.
        </p>

        <a
          href="#about"
          className="animate-fade-rise-delay-2 liquid-glass rounded-full px-14 py-5 text-base mt-12 transition-transform duration-200 hover:scale-[1.03] cursor-pointer"
          style={{
            color: "var(--text-primary)",
            fontFamily: "'Inter', sans-serif",
            textDecoration: "none",
          }}
        >
          Begin Journey
        </a>
      </div>
    </section>
  );
}
