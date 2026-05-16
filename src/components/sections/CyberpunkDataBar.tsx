"use client";

import { useRef } from "react";

const DATA_METRICS = [
  { label: "PROJECTS_BUILT", value: "04", unit: "TOTAL" },
  { label: "CERTS_EARNED", value: "01+", unit: "ACTIVE" },
  { label: "REPOS_ONLINE", value: "10+", unit: "GITHUB" },
  { label: "SYS_UPTIME", value: "99.9%", unit: "STATUS" },
] as const;

export function CyberpunkDataBar() {
  return (
    <section
      aria-label="Statistics"
      style={{
        borderTop: "1px solid #FFFFFF",
        borderBottom: "1px solid #FFFFFF",
        background: "#000000",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {DATA_METRICS.map((metric, i) => (
          <DataCell key={metric.label} metric={metric} isLast={i === DATA_METRICS.length - 1} />
        ))}
      </div>
    </section>
  );
}

function DataCell({
  metric,
  isLast,
}: {
  metric: (typeof DATA_METRICS)[number];
  isLast: boolean;
}) {
  return (
    <div
      className="cp-data-cell"
      style={{
        padding: "2rem",
        borderRight: isLast ? "none" : "1px solid #FFFFFF",
        background: "#000000",
        color: "#FFFFFF",
      }}
    >
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: "#555555",
          marginBottom: "0.5rem",
          textTransform: "uppercase",
        }}
      >
        {metric.label}
      </p>
      <p
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "2.5rem",
          fontWeight: 800,
          lineHeight: 1,
          color: "#00FF00",
          marginBottom: "0.25rem",
        }}
      >
        {metric.value}
      </p>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          color: "#444444",
          letterSpacing: "0.1em",
        }}
      >
        [{metric.unit}]
      </p>
    </div>
  );
}
