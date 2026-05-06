"use client";

import { motion } from "framer-motion";
import { fadeInUp, cardHover, cardTap } from "@/lib/animations";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      variants={fadeInUp}
      custom={index}
      whileHover={cardHover}
      whileTap={cardTap}
      layout
      className="glass rounded-[var(--radius-lg)] overflow-hidden group"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden" style={{ background: "var(--bg-surface)" }}>
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
          style={{ background: "rgba(11, 15, 20, 0.8)" }}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full transition-colors"
              style={{
                background: "var(--bg-glass)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-subtle)",
              }}
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github size={18} />
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full transition-colors"
              style={{
                background: "var(--accent-primary)",
                color: "#ffffff",
              }}
              aria-label={`View live demo of ${project.title}`}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs font-mono px-2.5 py-1 rounded-full"
              style={{
                background: "var(--accent-primary-glow)",
                color: "var(--accent-primary)",
                border: "1px solid var(--border-accent)",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
