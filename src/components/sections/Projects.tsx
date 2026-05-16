"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects, projectCategories, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");

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
          className="flex flex-wrap justify-center gap-2 mb-12"
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
