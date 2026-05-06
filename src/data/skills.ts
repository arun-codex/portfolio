export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
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
  { name: "C", icon: "FileCode2", category: "Programming" },
  { name: "JavaScript", icon: "Braces", category: "Programming" },

  // Web Development
  { name: "HTML", icon: "Code2", category: "Web Development" },
  { name: "CSS", icon: "Palette", category: "Web Development" },
  { name: "JavaScript", icon: "Braces", category: "Web Development" },

  // Cybersecurity
  { name: "Linux", icon: "Terminal", category: "Cybersecurity" },
  { name: "Networking", icon: "Network", category: "Cybersecurity" },

  // Tools
  { name: "Git", icon: "GitBranch", category: "Tools" },
  { name: "GitHub", icon: "Github", category: "Tools" },
  { name: "VS Code", icon: "Code2", category: "Tools" },
  { name: "MySQL", icon: "Database", category: "Tools" },
  { name: "Excel", icon: "Sheet", category: "Tools" },
];
