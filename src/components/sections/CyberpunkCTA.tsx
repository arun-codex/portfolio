"use client";

export function CyberpunkCTA() {
  return (
    <section
      aria-label="Call to action"
      style={{
        background: "#00FF00",
        padding: "5rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "3rem",
          flexWrap: "wrap",
        }}
      >
        {/* Heading */}
        <div style={{ flex: 1, minWidth: "280px" }}>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "#000000",
              opacity: 0.6,
              marginBottom: "1rem",
            }}
          >
            // READY_TO_EXECUTE
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              color: "#000000",
              textTransform: "uppercase",
            }}
          >
            UPGRADE
            <br />
            YOUR
            <br />
            PRESENCE.
            <br />
            <span style={{ display: "inline-block", marginTop: "0.25rem" }}>
              NOW
            </span>
          </h2>
        </div>

        {/* CTA Right */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "13px",
              lineHeight: 1.7,
              color: "#000000",
              maxWidth: "320px",
              opacity: 0.8,
            }}
          >
            {"> "}Open to internship opportunities
            <br />
            {"> "}Cybersecurity & development roles
            <br />
            {"> "}Available for collaboration
          </p>

          <a
            href="#contact"
            className="btn-brutalist btn-brutalist-dark"
            style={{
              fontSize: "1.125rem",
              padding: "1rem 2rem",
              letterSpacing: "0.05em",
            }}
          >
            INITIATE_CONTACT
          </a>

          {/* Status bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color: "#000000",
              opacity: 0.6,
            }}
          >
            <span className="cp-status-dot" style={{ background: "#000000" }} />
            RESPONSE_TIME: &lt; 24HRS
          </div>
        </div>
      </div>
    </section>
  );
}
