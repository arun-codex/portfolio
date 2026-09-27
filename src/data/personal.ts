/**
 * personal.ts — Single source of truth for personal brand information.
 *
 * Rules:
 *   - Do NOT duplicate these values across components.
 *   - Communication email: arun.cyberx@gmail.com (never change this).
 *   - All social URLs must match the verified public profiles.
 */

export const personal = {
  name: "Arun Kumar",
  headline: "Cybersecurity Student & Developer",
  bio: `BCA student building practical cybersecurity skills through Linux labs, networking experiments, secure development, and hands-on technical projects. Focused on becoming internship-ready through execution rather than theory alone.`,
  email: "arun.cyberx@gmail.com",
  location: "India",
  website: "https://arunx.xyz",
  resumeUrl: "/resume.pdf",
} as const;

export const brandTagline = "Learn. Practice. Build. Document. Improve.";
export const resumeUpdated = "2026-09-01"; // ISO date — update when resume changes

export const socialLinks = {
  /** Professional links — shown in Hero, Footer, Contact, and Ask Arun */
  professional: [
    {
      name: "GitHub",
      url: "https://github.com/arun-codex",
      icon: "Github",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/arun-codex/",
      icon: "Linkedin",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/arunx.xyz/",
      icon: "Instagram",
    },
    {
      name: "Email",
      url: "mailto:arun.cyberx@gmail.com",
      icon: "Mail",
    },
  ],
  /** Personal / lifestyle links — shown in Contact "More About Me" expander */
  personal: [
    {
      name: "Instagram",
      url: "https://www.instagram.com/arunx.xyz/",
      icon: "Instagram",
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/user/8m50p2g5xyx8tae99inbin4jy",
      icon: "Music",
    },
  ],
} as const;

export const typingRoles = [
  "Cybersecurity Learner",
  "BCA Student",
  "Linux Explorer",
  "Security Builder",
] as const;

export const stats = [
  { label: "Projects Completed", value: 4 },
  { label: "Certifications", value: 1 },
  { label: "GitHub Repositories", value: 10 },
] as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
] as const;
