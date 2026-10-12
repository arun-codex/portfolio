"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { personal } from "@/data/personal";
import { Download, GraduationCap, Code2, Shield, Briefcase } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "Bachelor of Computer Applications (BCA) — Building strong fundamentals in CS, networking, and security.",
  },
  {
    icon: Code2,
    title: "Technical Focus",
    description: "C programming, web development (HTML/CSS/JS), Linux administration, and database management.",
  },
  {
    icon: Shield,
    title: "Security Learning",
    description: "Networking fundamentals, Linux permissions, system hardening, and vulnerability awareness.",
  },
  {
    icon: Briefcase,
    title: "Seeking",
    description: "Internship opportunities in cybersecurity, IT security, or web development to gain real-world experience.",
  },
];

export function Resume() {
  return (
    <section id="resume" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="// Resume" subtitle="Professional Summary" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6 mb-10"
        >
          {highlights.map((item, i) => (
            <motion.div key={item.title} variants={i % 2 === 0 ? fadeInLeft : fadeInRight}>
              <GlassCard>
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-sm)] shrink-0"
                    style={{ background: "var(--accent-primary-glow)" }}
                  >
                    <item.icon size={20} style={{ color: "var(--accent-primary)" }} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
          <Button variant="primary" size="lg" href={personal.resumeUrl} download icon={<Download size={18} />}>
            Download Full Resume (PDF)
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
