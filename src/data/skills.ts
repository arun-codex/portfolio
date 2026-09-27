/**
 * skills.ts — Technical skills organized by honest, meaningful categories.
 *
 * Rules:
 *   - Only list skills Arun has genuinely practiced.
 *   - Do not add technologies just to look impressive.
 *   - Keep categories aligned with the portfolio brand (Cybersecurity focus).
 */

export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
  url?: string;
}

export type SkillCategory =
  | "Cybersecurity"
  | "Systems & Networking"
  | "Programming"
  | "Web Development"
  | "Tools";

export const skillCategories: SkillCategory[] = [
  "Cybersecurity",
  "Systems & Networking",
  "Programming",
  "Web Development",
  "Tools",
];

export const skills: Skill[] = [
  // ── Cybersecurity ─────────────────────────────────────────────────────────
  { name: "Security Fundamentals", icon: "Shield", category: "Cybersecurity" },
  { name: "Linux Permissions", icon: "Lock", category: "Cybersecurity" },
  { name: "Access Control", icon: "KeyRound", category: "Cybersecurity" },
  { name: "Web Security (OWASP)", icon: "Globe", category: "Cybersecurity" },
  { name: "Vulnerability Awareness", icon: "AlertTriangle", category: "Cybersecurity" },
  { name: "SOC Fundamentals", icon: "Monitor", category: "Cybersecurity" },

  // ── Systems & Networking ─────────────────────────────────────────────────
  { name: "Linux Administration", icon: "Terminal", category: "Systems & Networking", url: "https://www.kernel.org/" },
  { name: "Bash Scripting", icon: "Terminal", category: "Systems & Networking" },
  { name: "Networking (TCP/IP)", icon: "Network", category: "Systems & Networking" },
  { name: "DNS & HTTP/HTTPS", icon: "Server", category: "Systems & Networking" },
  { name: "Wireshark", icon: "Activity", category: "Systems & Networking" },
  { name: "Windows Administration", icon: "Monitor", category: "Systems & Networking" },

  // ── Programming ──────────────────────────────────────────────────────────
  { name: "Python", icon: "FileCode2", category: "Programming", url: "https://github.com/arun-codex/Complate-Python-beginner-to-intermediate-" },
  { name: "C", icon: "FileCode2", category: "Programming", url: "https://github.com/arun-codex/c-learning-project" },
  { name: "JavaScript", icon: "Braces", category: "Programming" },

  // ── Web Development ──────────────────────────────────────────────────────
  { name: "HTML5", icon: "Code2", category: "Web Development" },
  { name: "CSS3", icon: "Palette", category: "Web Development" },
  { name: "React", icon: "Layers", category: "Web Development" },
  { name: "Next.js", icon: "Zap", category: "Web Development" },
  { name: "TypeScript", icon: "Braces", category: "Web Development" },

  // ── Tools ─────────────────────────────────────────────────────────────────
  { name: "Git", icon: "GitBranch", category: "Tools", url: "https://git-scm.com/" },
  { name: "GitHub", icon: "Github", category: "Tools", url: "https://github.com/arun-codex" },
  { name: "VS Code", icon: "Code2", category: "Tools" },
  { name: "MySQL", icon: "Database", category: "Tools" },
  { name: "Nmap", icon: "Search", category: "Tools" },
  { name: "Packet Tracer", icon: "Network", category: "Tools" },
];
