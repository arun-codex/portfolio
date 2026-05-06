"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CertCard } from "@/components/ui/CertCard";
import { certifications } from "@/data/certifications";
import { GlassCard } from "@/components/ui/GlassCard";
import { Award } from "lucide-react";

export function Certifications() {
  const hasCerts = certifications.length > 0;

  return (
    <section id="certifications" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="// Certifications" subtitle="Credentials & Learning" />

        {hasCerts ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-6"
          >
            {certifications.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <GlassCard hover={false} className="max-w-lg mx-auto text-center py-12">
              <div
                className="flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-4"
                style={{ background: "var(--accent-primary-glow)" }}
              >
                <Award size={28} style={{ color: "var(--accent-primary)" }} />
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Currently Pursuing Certifications
              </h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Actively working toward industry-recognized credentials in cybersecurity and development. This section will be updated as certifications are earned.
              </p>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </section>
  );
}
