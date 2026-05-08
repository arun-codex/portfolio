export interface Project {
  id: string;
  title: string;
  description: string;
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
    id: "linux-access-control",
    title: "Linux Access Control Simulation",
    description:
      "Simulated Linux permission systems using chmod, user roles, and file access management. Explored real-world access control scenarios in a controlled lab environment.",
    skills: ["Linux", "Bash", "Security"],
    category: "Security",
    github: "https://github.com/mrarunkumar18",
    image: "/images/projects/linux-access-control.webp",
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    description:
      "Built and deployed a responsive portfolio website using HTML, CSS, and JavaScript. Designed for recruiter visibility and professional branding.",
    skills: ["HTML", "CSS", "JavaScript"],
    category: "Web",
    github: "https://github.com/mrarunkumar18/portfolio",
    liveDemo: "https://arunsingh.xyz",
    image: "/images/projects/portfolio.png",
  },
  {
    id: "system-programming-toolkit",
    title: "System Programming Practice Toolkit",
    description:
      "Built multiple C programs covering arrays, loops, calculators, and file handling. Focused on strengthening low-level programming fundamentals.",
    skills: ["C", "Data Structures", "Algorithms"],
    category: "Programming",
    github: "https://github.com/mrarunkumar18",
    image: "/images/projects/system-programming.webp",
  },
  {
    id: "ai-workflow-exploration",
    title: "AI Workflow Exploration",
    description:
      "Experimented with prompt engineering, productivity systems, and AI-powered workflows. Explored practical applications of AI tools for development acceleration.",
    skills: ["AI", "Prompt Engineering", "Productivity"],
    category: "AI",
    github: "https://github.com/mrarunkumar18",
    image: "/images/projects/ai-workflow.webp",
  },
  {
    id: "weather-app",
    title: "Weather — UI Dashboard",
    description:
      "A modern weather dashboard built with React and deployed on Vercel. Features saved cities, 7-day forecasts, and responsive UI with smooth animations.",
    skills: ["React", "Next.js", "Tailwind", "API"],
    category: "Web",
    github: "https://github.com/arun-codex/Weather",
    liveDemo: "https://weather-omega-pink.vercel.app/",
    image: "/images/projects/weather.png",
  },
];
