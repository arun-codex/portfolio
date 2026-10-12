/**
 * projects.ts — Portfolio projects.
 *
 * Rules:
 *   - Only list real projects with verified GitHub/demo URLs.
 *   - Each project should answer: What → Technologies → What I learned.
 *   - Do not fabricate achievements or metrics.
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  learned: string;       // What was built / what was learned — honest, concise
  skills: string[];
  category: ProjectCategory;
  github?: string;
  liveDemo?: string;
  image: string;
}

export type ProjectCategory = "All" | "Security" | "Web" | "Programming" | "AI";

export const projectCategories: ProjectCategory[] = [
  "All",
  "Security",
  "Web",
  "Programming",
  "AI",
];

export const projects: Project[] = [
  {
    id: "cybersecurity-learning",
    title: "Cybersecurity Learning Journey",
    description:
      "My hands-on cybersecurity learning journey focused on networking, Linux, SOC, Blue Team, security analysis, and practical labs. A public record of practical study — not a finished product.",
    learned:
      "Networking (OSI, TCP/IP, DNS, HTTP/HTTPS, TLS), Linux (filesystem, permissions, users/groups, processes), network troubleshooting (ping, traceroute, firewall, ss), and security fundamentals (CIA triad, AAA, threat/vulnerability/risk, IOC/TTP, phishing, brute force, malware).",
    skills: ["Linux", "Networking", "SOC", "Blue Team", "Security Analysis", "Practical Labs"],
    category: "Security",
    github: "https://github.com/arun-codex/cybersecurity-learning",
    image: "/images/projects/cybersecurity-learning.png",
  },
  {
    id: "linux-access-control",
    title: "Linux Access Control Lab",
    description:
      "Simulated Linux permission systems using chmod, user roles, and file access management. Explored real-world access control scenarios in a controlled lab environment.",
    learned:
      "Hands-on with Linux file permissions, ownership, chmod, user/group management, and access control fundamentals.",
    skills: ["Linux", "Bash", "Security"],
    category: "Security",
    github: "https://github.com/arun-codex",
    image: "/images/projects/linux-access-control.webp",
  },
  {
    id: "weather-app",
    title: "Weather UI Dashboard",
    description:
      "A modern weather dashboard built with React and deployed on Vercel. Features saved cities, 7-day forecasts, and a responsive UI with smooth animations.",
    learned:
      "Working with external APIs, React state management, responsive design, and deploying full projects publicly via Vercel.",
    skills: ["React", "Next.js", "TypeScript", "API"],
    category: "Web",
    github: "https://github.com/arun-codex/Weather",
    liveDemo: "https://weather-omega-pink.vercel.app/",
    image: "/images/projects/weather.png",
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    description:
      "Built and continuously improved this portfolio website — ArunX.xyz — as a public technical identity and learning journal.",
    learned:
      "Next.js app architecture, TypeScript, design systems, AI integration, and building a production-grade personal brand site.",
    skills: ["Next.js", "TypeScript", "React", "Tailwind"],
    category: "Web",
    github: "https://github.com/arun-codex/portfolio",
    liveDemo: "https://arunx.xyz",
    image: "/images/projects/portfolio.png",
  },
  {
    id: "system-programming-toolkit",
    title: "C Programming Practice Suite",
    description:
      "Built multiple C programs covering arrays, loops, calculators, and file handling. Focused on strengthening low-level programming fundamentals.",
    learned:
      "Solid foundation in C: memory concepts, control flow, file I/O, and problem-solving at the systems level.",
    skills: ["C", "Data Structures", "Algorithms"],
    category: "Programming",
    github: "https://github.com/arun-codex/c-learning-project",
    image: "/images/projects/system-programming.webp",
  },
  {
    id: "ai-workflow-exploration",
    title: "AI Workflow Exploration",
    description:
      "Experimented with prompt engineering, productivity systems, and AI-powered workflows. Explored practical applications of AI tools for development acceleration.",
    learned:
      "Prompt engineering patterns, practical use of LLMs for productivity and automation, and how AI tools fit into technical workflows.",
    skills: ["AI", "Prompt Engineering", "Python"],
    category: "AI",
    github: "https://github.com/arun-codex",
    image: "/images/projects/ai-workflow.webp",
  },
];
