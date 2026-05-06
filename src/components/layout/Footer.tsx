"use client";

import { personal, socialLinks } from "@/data/personal";
import { Mail, Heart } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/SocialIcons";

const iconMap: Record<string, React.ReactNode> = {
  Github: <Github size={18} />,
  Linkedin: <Linkedin size={18} />,
  Mail: <Mail size={18} />,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-12 px-6"
      style={{
        borderTop: "1px solid var(--border-subtle)",
        background: "var(--bg-surface)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <span
              className="font-mono text-sm font-semibold"
              style={{ color: "var(--accent-primary)" }}
            >
              {personal.name.split(" ")[0].toLowerCase()}@portfolio
            </span>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              Built with Next.js + TypeScript
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.professional.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.url.startsWith("mailto") ? undefined : "_blank"}
                rel={link.url.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-sm)] transition-all duration-200"
                style={{
                  color: "var(--text-secondary)",
                  background: "var(--bg-glass)",
                  border: "1px solid var(--border-subtle)",
                }}
                aria-label={link.name}
              >
                {iconMap[link.icon]}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p
            className="flex items-center gap-1.5 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            © {currentYear} {personal.name}. Made with{" "}
            <Heart size={12} className="inline" style={{ color: "var(--accent-primary)" }} />
          </p>
        </div>
      </div>
    </footer>
  );
}
