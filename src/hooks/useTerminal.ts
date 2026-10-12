"use client";

import { useState, useCallback } from "react";
import { personal, socialLinks } from "@/data/personal";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";

interface TerminalLine {
  type: "input" | "output" | "error";
  content: string;
}

const HELP_TEXT = `Available commands:
  help        — Show this message
  about       — Learn about me
  skills      — View my skills
  projects    — List my projects
  contact     — Get my contact info
  clear       — Clear terminal
  sudo hire-me — You know what to do`;

const ABOUT_TEXT = `${personal.name}
${personal.headline}

${personal.bio}`;

function getSkillsText(): string {
  const categories = [...new Set(skills.map((s) => s.category))];
  return categories
    .map((cat) => {
      const catSkills = skills.filter((s) => s.category === cat);
      return `[${cat}]\n  ${catSkills.map((s) => s.name).join(", ")}`;
    })
    .join("\n\n");
}

function getProjectsText(): string {
  return projects
    .map((p, i) => `${i + 1}. ${p.title}\n   ${p.description}`)
    .join("\n\n");
}

const CONTACT_TEXT = `Professional:
  Email:    ${personal.email}
  GitHub:   ${socialLinks.professional[0].url}
  LinkedIn: ${socialLinks.professional[1].url}

Say hello — I'm always open to opportunities.`;

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: `Welcome to ${personal.name.toLowerCase().replace(" ", "")}@portfolio` },
    { type: "output", content: 'Type "help" for available commands.\n' },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const execute = useCallback((input: string) => {
    const trimmed = input.trim().toLowerCase();
    const inputLine: TerminalLine = { type: "input", content: `$ ${input}` };

    if (!trimmed) {
      setLines((prev) => [...prev, inputLine]);
      return;
    }

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    let output: TerminalLine;

    switch (trimmed) {
      case "help":
        output = { type: "output", content: HELP_TEXT };
        break;
      case "about":
        output = { type: "output", content: ABOUT_TEXT };
        break;
      case "skills":
        output = { type: "output", content: getSkillsText() };
        break;
      case "projects":
        output = { type: "output", content: getProjectsText() };
        break;
      case "contact":
        output = { type: "output", content: CONTACT_TEXT };
        break;
      case "clear":
        setLines([]);
        return;
      case "sudo hire-me":
        window.open(`mailto:${personal.email}?subject=Let's Talk — Internship Opportunity`, "_blank");
        output = { type: "output", content: "Opening email client... Let's connect!" };
        break;
      default:
        output = { type: "error", content: `Command not found: ${trimmed}. Type "help" for available commands.` };
    }

    setLines((prev) => [...prev, inputLine, output]);
  }, []);

  const navigateHistory = useCallback(
    (direction: "up" | "down") => {
      if (history.length === 0) return "";
      let newIndex = historyIndex;
      if (direction === "up") {
        newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      } else {
        newIndex = historyIndex === -1 ? -1 : Math.min(history.length - 1, historyIndex + 1);
      }
      setHistoryIndex(newIndex);
      return newIndex === -1 ? "" : history[newIndex];
    },
    [history, historyIndex]
  );

  const clearLines = useCallback(() => setLines([]), []);

  return { lines, execute, navigateHistory, clearLines };
}
