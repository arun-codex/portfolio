export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
  url?: string;
}

export type SkillCategory = "Programming" | "Web Development" | "Cybersecurity" | "Tools";

export const skillCategories: SkillCategory[] = [
  "Programming",
  "Web Development",
  "Cybersecurity",
  "Tools",
];

export const skills: Skill[] = [
  // Programming
  { name: "C", icon: "FileCode2", category: "Programming", url: "https://github.com/arun-codex/c-learning-project" },
  { name: "JavaScript", icon: "Braces", category: "Programming", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "Python", icon: "FileCode2", category: "Programming", url: "https://github.com/arun-codex/Complate-Python-beginner-to-intermediate-" },

  // Web Development
  { name: "HTML", icon: "Code2", category: "Web Development", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS", icon: "Palette", category: "Web Development", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "JavaScript", icon: "Braces", category: "Web Development", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },

  // Cybersecurity
  { name: "Linux", icon: "Terminal", category: "Cybersecurity", url: "https://www.kernel.org/" },
  { name: "Networking", icon: "Network", category: "Cybersecurity", url: "https://en.wikipedia.org/wiki/Computer_network" },

  // Tools
  { name: "Git", icon: "GitBranch", category: "Tools", url: "https://git-scm.com/" },
  { name: "GitHub", icon: "Github", category: "Tools", url: "https://github.com/" },
  { name: "VS Code", icon: "Code2", category: "Tools", url: "https://code.visualstudio.com/" },
  { name: "MySQL", icon: "Database", category: "Tools", url: "https://www.mysql.com/" },
  { name: "Excel", icon: "Sheet", category: "Tools", url: "https://www.microsoft.com/en-us/microsoft-365/excel" },
];
