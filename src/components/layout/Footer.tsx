"use client";

import { personal, brandTagline, socialLinks, navLinks } from "@/data/personal";
import { Mail } from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/ui/SocialIcons";

const iconMap: Record<string, React.ReactNode> = {
  Github: <Github size={18} />,
  Linkedin: <Linkedin size={18} />,
  Instagram: <Instagram size={18} />,
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
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p
              className="font-semibold text-base mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              {personal.name}
            </p>
            <p
              className="text-sm mb-2"
              style={{ color: "var(--text-secondary)" }}
            >
              {personal.headline}
            </p>
            <p
              className="font-mono text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              {brandTagline}
            </p>
          </div>

          {/* Nav Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 justify-center md:justify-start">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.professional.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.url.startsWith("mailto") ? undefined : "_blank"}
                rel={link.url.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-sm)] transition-all duration-200 hover:scale-110"
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
        </div>

        {/* Copyright */}
        <div
          className="mt-8 pt-6 text-center text-xs"
          style={{
            borderTop: "1px solid var(--border-subtle)",
            color: "var(--text-muted)",
          }}
        >
          © {currentYear} {personal.name}
        </div>
      </div>
    </footer>
  );
}
