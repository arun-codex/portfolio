"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainerFast, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillCard } from "@/components/ui/SkillCard";
import { skills, skillCategories, type SkillCategory } from "@/data/skills";
import { cn } from "@/lib/utils";

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("Programming");

  const filteredSkills = skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="// Skills" subtitle="Technical Toolkit" />

        {/* Category Tabs */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-[var(--radius-sm)] transition-all duration-200",
                activeCategory === cat
                  ? "shadow-sm"
                  : ""
              )}
              style={{
                background:
                  activeCategory === cat
                    ? "var(--accent-primary)"
                    : "var(--bg-glass)",
                color:
                  activeCategory === cat
                    ? "#ffffff"
                    : "var(--text-secondary)",
                border: `1px solid ${
                  activeCategory === cat
                    ? "var(--accent-primary)"
                    : "var(--border-subtle)"
                }`,
              }}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={staggerContainerFast}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {filteredSkills.map((skill, i) => (
              <SkillCard
                key={`${skill.name}-${skill.category}`}
                name={skill.name}
                icon={skill.icon}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
