"use client";

import * as LucideIcons from "lucide-react";
import { type LucideIcon } from "lucide-react";

const SERVICE_CARDS = [
  {
    icon: "Terminal",
    title: "LINUX_OPS",
    description: "Hands-on system administration, shell scripting, and privilege escalation labs in hardened Linux environments.",
    tag: "STACK",
    tagColor: "#00FF00",
  },
  {
    icon: "Network",
    title: "NET_SECURITY",
    description: "Packet analysis, firewall config, and network topology design using industry-standard protocols.",
    tag: "PROTO",
    tagColor: "#FFFFFF",
  },
  {
    icon: "Shield",
    title: "SECURE_DEV",
    description: "Building applications with security-first architecture: input validation, auth hardening, and OWASP compliance.",
    tag: "STACK",
    tagColor: "#00FF00",
  },
  {
    icon: "Code2",
    title: "WEB_SYSTEMS",
    description: "Full-stack web development with modern JavaScript frameworks, REST APIs, and database integration.",
    tag: "STACK",
    tagColor: "#00FF00",
  },
  {
    icon: "GitBranch",
    title: "VERSION_CTRL",
    description: "Git-based workflow management, branching strategies, CI/CD pipelines, and collaborative code review.",
    tag: "PROTO",
    tagColor: "#FFFFFF",
  },
  {
    icon: "Database",
    title: "DATA_SYSTEMS",
    description: "Relational database design, SQL query optimization, and secure data storage implementation.",
    tag: "STACK",
    tagColor: "#00FF00",
  },
] as const;

export function CyberpunkServicesGrid() {
  return (
    <section
      aria-label="Services and Skills"
      style={{
        background: "#000000",
        borderTop: "1px solid #FFFFFF",
      }}
    >
      {/* Section header */}
      <div
        style={{
          padding: "2rem",
          borderBottom: "1px solid #111111",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            color: "#00FF00",
            letterSpacing: "0.15em",
          }}
        >
          // CAPABILITY_MATRIX
        </span>
        <div style={{ flex: 1, height: "1px", background: "#111111" }} />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            color: "#333333",
          }}
        >
          [6 MODULES LOADED]
        </span>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          borderLeft: "1px solid #FFFFFF",
        }}
      >
        {SERVICE_CARDS.map((card) => (
          <ServiceCard key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  card,
}: {
  card: (typeof SERVICE_CARDS)[number];
}) {
  const Icon = (LucideIcons[card.icon as keyof typeof LucideIcons] as LucideIcon) || LucideIcons.Code2;

  return (
    <div
      className="cp-data-cell"
      style={{
        padding: "3rem",
        borderRight: "1px solid #FFFFFF",
        borderBottom: "1px solid #FFFFFF",
        background: "#000000",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        minHeight: "240px",
      }}
    >
      {/* Icon */}
      <div>
        <Icon
          size={24}
          style={{ color: "#00FF00", strokeWidth: 1.5 }}
        />
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "1.125rem",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "#FFFFFF",
          textTransform: "uppercase",
        }}
      >
        {card.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          lineHeight: 1.7,
          color: "#666666",
          flex: 1,
        }}
      >
        {card.description}
      </p>

      {/* Tag */}
      <div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            fontWeight: 700,
            padding: "2px 8px",
            border: `1px solid ${card.tagColor}`,
            color: card.tagColor,
            letterSpacing: "0.1em",
          }}
        >
          {card.tag}
        </span>
      </div>
    </div>
  );
}
