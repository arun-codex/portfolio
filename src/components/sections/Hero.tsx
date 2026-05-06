"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, staggerContainer } from "@/lib/animations";
import { personal, typingRoles, socialLinks } from "@/data/personal";
import { Button } from "@/components/ui/Button";
import { TypeWriter } from "@/components/ui/TypeWriter";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import { Download, ArrowDown, Mail } from "lucide-react";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { type LucideIcon } from "lucide-react";

const socialIconMap: Record<string, LucideIcon> = {
  Github: LucideIcons.Github,
  Linkedin: LucideIcons.Linkedin,
  Mail: LucideIcons.Mail,
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-16"
    >
      {/* Background */}
      <AnimatedGrid />
      <div className="glow-dot glow-dot-purple top-20 -left-32" />
      <div className="glow-dot glow-dot-cyan bottom-20 -right-32" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto w-full"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <motion.div variants={fadeInLeft} className="flex-1 text-center lg:text-left">
            <p
              className="font-mono text-sm mb-4 tracking-wider"
              style={{ color: "var(--accent-secondary)" }}
            >
              Hello, I&apos;m
            </p>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {personal.name}
            </h1>

            <h2
              className="text-xl sm:text-2xl font-medium mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              {personal.headline}
            </h2>

            <div
              className="text-lg sm:text-xl font-mono mb-6 h-8"
              style={{ color: "var(--text-muted)" }}
            >
              <TypeWriter words={typingRoles} />
            </div>

            <p
              className="text-base max-w-lg mb-8 leading-relaxed mx-auto lg:mx-0"
              style={{ color: "var(--text-secondary)" }}
            >
              {personal.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <Button
                variant="primary"
                href={personal.resumeUrl}
                download
                icon={<Download size={16} />}
              >
                Download Resume
              </Button>
              <Button
                variant="ghost"
                href="#projects"
              >
                View Projects
              </Button>
              <Button
                variant="outline"
                href="#contact"
                icon={<Mail size={16} />}
              >
                Contact Me
              </Button>
            </div>

            {/* Social Links */}
            <motion.div
              variants={fadeInUp}
              className="flex gap-3 justify-center lg:justify-start"
            >
              {socialLinks.professional.map((link) => {
                const Icon = socialIconMap[link.icon] || LucideIcons.Link;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target={link.url.startsWith("mailto") ? undefined : "_blank"}
                    rel={link.url.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-sm)] transition-all duration-200 hover:scale-110"
                    style={{
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-subtle)",
                    }}
                    aria-label={link.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            variants={fadeInUp}
            className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 shrink-0"
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                padding: "3px",
              }}
            >
              <div
                className="w-full h-full rounded-full overflow-hidden"
                style={{ background: "var(--bg-primary)" }}
              >
                <Image
                  src="/images/profile.png"
                  alt={`Profile photo of ${personal.name}`}
                  width={320}
                  height={320}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
              </div>
            </div>
            {/* Decorative ring */}
            <div
              className="absolute -inset-3 rounded-full opacity-20 animate-pulse"
              style={{
                border: "1px solid var(--accent-primary)",
              }}
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          variants={fadeInUp}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} style={{ color: "var(--text-muted)" }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
