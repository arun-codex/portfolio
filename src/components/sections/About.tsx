"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { personal, brandTagline, stats } from "@/data/personal";
import { Target, BookOpen, Shield } from "lucide-react";

function AnimatedCounter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (value === 0) return;
    let current = 0;
    const step = Math.max(1, Math.floor(value / 30));
    const interval = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="text-3xl font-bold font-mono"
        style={{ color: "var(--accent-primary)" }}
      >
        {count}+
      </div>
      <div
        className="text-xs mt-1"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="// About" subtitle="Who is Arun?" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Bio */}
          <motion.div variants={fadeInLeft}>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              {personal.bio}
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-[var(--radius-sm)] shrink-0 mt-0.5"
                  style={{ background: "var(--accent-primary-glow)" }}
                >
                  <Target size={16} style={{ color: "var(--accent-primary)" }} />
                </div>
                <div>
                  <h3
                    className="text-sm font-semibold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Career Goal
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Currently focused on becoming internship-ready for cybersecurity roles,
                    with particular interest in SOC, Blue Team, Linux, networking, and security operations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-[var(--radius-sm)] shrink-0 mt-0.5"
                  style={{ background: "var(--accent-secondary-glow)" }}
                >
                  <BookOpen size={16} style={{ color: "var(--accent-secondary)" }} />
                </div>
                <div>
                  <h3
                    className="text-sm font-semibold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Education
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Bachelor of Computer Applications (BCA) at Parul University, Vadodara
                    — building strong fundamentals in programming, networking, operating systems, and security.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-[var(--radius-sm)] shrink-0 mt-0.5"
                  style={{ background: "var(--accent-primary-glow)" }}
                >
                  <Shield size={16} style={{ color: "var(--accent-primary)" }} />
                </div>
                <div>
                  <h3
                    className="text-sm font-semibold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Focus Areas
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Linux administration, networking fundamentals, security concepts,
                    Python scripting, secure web development, and practical lab work.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats & Code Card */}
          <motion.div variants={fadeInRight} className="space-y-6">
            <GlassCard hover={false} glow>
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat) => (
                  <AnimatedCounter
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                  />
                ))}
              </div>
            </GlassCard>

            <GlassCard hover={false}>
              <p
                className="text-sm font-mono leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                <span style={{ color: "var(--accent-primary)" }}>const</span>{" "}
                <span style={{ color: "var(--accent-secondary)" }}>arun</span> = {`{`}
                <br />
                &nbsp;&nbsp;status:{" "}
                <span style={{ color: "var(--accent-primary)" }}>&quot;actively learning&quot;</span>,
                <br />
                &nbsp;&nbsp;seeking:{" "}
                <span style={{ color: "var(--accent-primary)" }}>&quot;cybersecurity internship&quot;</span>,
                <br />
                &nbsp;&nbsp;approach:{" "}
                <span style={{ color: "var(--accent-primary)" }}>&quot;execution over theory&quot;</span>
                <br />
                {`}`};
              </p>
              <p
                className="text-xs font-mono mt-4 pt-4"
                style={{
                  color: "var(--text-muted)",
                  borderTop: "1px solid var(--border-subtle)",
                }}
              >
                {"// "}{brandTagline}
              </p>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
