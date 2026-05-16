"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects, projectCategories, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useThemeContext } from "@/components/providers/ThemeProvider";

const themeOptions = [
  { key: "dark", label: "Dark" },
  { key: "light", label: "Light" },
  { key: "cyberpunk", label: "Cyberpunk" },
  { key: "sketchbook", label: "Sketchbook" },
] as const;

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");
  const { theme, setTheme, mounted } = useThemeContext();

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="// Projects" subtitle="What I've Built" />

        {/* Filter Buttons */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-between items-center gap-2 mb-12"
        >
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-[var(--radius-sm)] transition-all duration-200"
                )}
                style={{
                  background:
                    activeFilter === cat
                      ? "var(--accent-primary)"
                      : "var(--bg-glass)",
                  color:
                    activeFilter === cat
                      ? "#ffffff"
                      : "var(--text-secondary)",
                  border: `1px solid ${
                    activeFilter === cat
                      ? "var(--accent-primary)"
                      : "var(--border-subtle)"
                  }`,
                }}
                aria-pressed={activeFilter === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Theme list view */}
          <div className="min-w-[220px] rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-2">
            <div
              className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--text-muted)" }}
            >
              Theme List
            </div>
            <div className="flex flex-col gap-1">
              {mounted &&
                themeOptions.map((option) => {
                  const isActive = theme === option.key;
                  return (
                    <button
                      key={option.key}
                      onClick={() => setTheme(option.key)}
                      className={cn(
                        "flex items-center justify-between rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-all duration-200"
                      )}
                      style={{
                        background: isActive
                          ? "var(--accent-primary)"
                          : "transparent",
                        color: isActive
                          ? "#ffffff"
                          : "var(--text-secondary)",
                        border: `1px solid ${
                          isActive ? "var(--accent-primary)" : "transparent"
                        }`,
                      }}
                      aria-pressed={isActive}
                    >
                      <span className="font-medium">{option.label}</span>
                      <span
                        className="text-[11px] uppercase tracking-[0.16em]"
                        style={{
                          color: isActive ? "#ffffff" : "var(--text-muted)",
                        }}
                      >
                        {isActive ? "Active" : "Select"}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid md:grid-cols-2 gap-6"
          >
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <p
            className="text-center text-sm mt-8"
            style={{ color: "var(--text-muted)" }}
          >
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
