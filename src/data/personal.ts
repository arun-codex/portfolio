export const personal = {
  name: "Arun Kumar",
  headline: "Cybersecurity Enthusiast & Developer",
  bio: `BCA student building practical cybersecurity skills through Linux labs, networking experiments, secure development, and hands-on technical projects. Focused on becoming internship-ready through execution rather than theory alone.`,
  email: "mrarunkumar1806@gmail.com",
  location: "India",
  website: "https://arunsingh.xyz",
  resumeUrl: "/resume.pdf",
} as const;

export const socialLinks = {
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
      name: "Email",
      url: "mailto:mrarunkumar1806@gmail.com",
      icon: "Mail",
    },
  ],
  personal: [
    {
      name: "X (Twitter)",
      url: "https://x.com/itz_arun_1806",
      icon: "Twitter",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/itz_arun_1806/",
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
