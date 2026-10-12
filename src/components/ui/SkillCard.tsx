"use client";

import { motion } from "framer-motion";
import { fadeInUp, cardHover } from "@/lib/animations";
import * as LucideIcons from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface SkillCardProps {
  name: string;
  icon: string;
  index: number;
  url?: string;
}

const iconMap = LucideIcons as unknown as Record<string, LucideIcon>;

export function SkillCard({ name, icon, index, url }: SkillCardProps) {
  const IconComponent = iconMap[icon] || LucideIcons.Code2;

  return (
    <motion.a
      href={url || "#"}
      target={url ? "_blank" : undefined}
      rel={url ? "noopener noreferrer" : undefined}
      variants={fadeInUp}
      custom={index}
      whileHover={cardHover}
      className={`glass glass-hover rounded-[var(--radius-md)] p-5 flex items-center gap-4 ${url ? "cursor-pointer" : "cursor-default"}`}
      onClick={!url ? (e) => e.preventDefault() : undefined}
    >
      <div
        className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-sm)]"
        style={{ background: "var(--accent-primary-glow)" }}
      >
        <IconComponent
          size={20}
          style={{ color: "var(--accent-primary)" }}
          aria-hidden="true"
        />
      </div>
      <span
        className="text-sm font-medium"
        style={{ color: "var(--text-primary)" }}
      >
        {name}
      </span>
    </motion.a>
  );
}

