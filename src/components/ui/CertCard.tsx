"use client";

import { motion } from "framer-motion";
import { fadeInUp, cardHover } from "@/lib/animations";
import { Award, ExternalLink } from "lucide-react";
import type { Certification } from "@/data/certifications";

interface CertCardProps {
  cert: Certification;
  index: number;
}

export function CertCard({ cert, index }: CertCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover={cardHover}
      className="glass glass-hover rounded-[var(--radius-lg)] p-6"
    >
      <div className="flex items-start gap-4">
        <div
          className="flex items-center justify-center w-12 h-12 rounded-[var(--radius-md)] shrink-0"
          style={{ background: "var(--accent-primary-glow)" }}
        >
          <Award size={24} style={{ color: "var(--accent-primary)" }} aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-base mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            {cert.name}
          </h3>
          <p
            className="text-sm mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            {cert.issuer} · {cert.date}
          </p>
          {cert.verificationUrl ? (
            <a
              href={cert.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: "var(--accent-secondary)" }}
            >
              <ExternalLink size={12} />
              Verify Credential
            </a>
          ) : (
            <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
              Verification Pending
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
