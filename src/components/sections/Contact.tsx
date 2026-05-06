"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { personal, socialLinks } from "@/data/personal";
import { Mail, MapPin, Send, ChevronDown, ChevronUp } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { Github, Linkedin, Twitter, Instagram } from "@/components/ui/SocialIcons";

const personalIconMap: Record<string, React.ElementType> = {
  Twitter: Twitter,
  Instagram: Instagram,
  Music: LucideIcons.Music,
};

export function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [showPersonal, setShowPersonal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xpzvqkdl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="// Contact" subtitle="Get In Touch" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Contact Info */}
          <motion.div variants={fadeInLeft} className="space-y-6">
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              I&apos;m actively looking for internship opportunities in cybersecurity, IT security, and web development. Let&apos;s connect.
            </p>

            <div className="space-y-4">
              <GlassCard hover={false} className="!p-4">
                <div className="flex items-center gap-3">
                  <Mail size={18} style={{ color: "var(--accent-primary)" }} />
                  <a href={`mailto:${personal.email}`} className="text-sm hover:underline" style={{ color: "var(--text-primary)" }}>
                    {personal.email}
                  </a>
                </div>
              </GlassCard>

              <GlassCard hover={false} className="!p-4">
                <div className="flex items-center gap-3">
                  <Github size={18} style={{ color: "var(--accent-primary)" }} />
                  <a href={socialLinks.professional[0].url} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: "var(--text-primary)" }}>
                    github.com/arun-codex
                  </a>
                </div>
              </GlassCard>

              <GlassCard hover={false} className="!p-4">
                <div className="flex items-center gap-3">
                  <Linkedin size={18} style={{ color: "var(--accent-primary)" }} />
                  <a href={socialLinks.professional[1].url} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: "var(--text-primary)" }}>
                    linkedin.com/in/itzarun1806
                  </a>
                </div>
              </GlassCard>

              <GlassCard hover={false} className="!p-4">
                <div className="flex items-center gap-3">
                  <MapPin size={18} style={{ color: "var(--accent-primary)" }} />
                  <span className="text-sm" style={{ color: "var(--text-primary)" }}>India</span>
                </div>
              </GlassCard>
            </div>

            {/* Personal Links - Expandable */}
            <div>
              <button
                onClick={() => setShowPersonal(!showPersonal)}
                className="flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                {showPersonal ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                More About Me
              </button>
              {showPersonal && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 flex gap-3">
                  {socialLinks.personal.map((link) => {
                    const Icon = personalIconMap[link.icon] || LucideIcons.Link;
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-sm)] transition-all hover:scale-110"
                        style={{ color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}
                        aria-label={link.name}
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeInRight}>
            <GlassCard hover={false} glow>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-[var(--radius-sm)] text-sm outline-none transition-all"
                    style={{
                      background: "var(--bg-surface)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border-subtle)",
                    }}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-[var(--radius-sm)] text-sm outline-none transition-all"
                    style={{
                      background: "var(--bg-surface)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border-subtle)",
                    }}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>Message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-[var(--radius-sm)] text-sm outline-none transition-all resize-none"
                    style={{
                      background: "var(--bg-surface)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border-subtle)",
                    }}
                    placeholder="Your message..."
                  />
                </div>

                <Button
                  variant="primary"
                  className="w-full"
                  type="submit"
                  disabled={status === "sending"}
                  icon={<Send size={16} />}
                >
                  {status === "sending" ? "Sending..." : status === "success" ? "Sent!" : "Send Message"}
                </Button>

                {status === "error" && (
                  <p className="text-sm text-center" style={{ color: "#ef4444" }}>
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </form>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
