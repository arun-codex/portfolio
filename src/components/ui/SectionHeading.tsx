"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <span
        className="inline-block font-mono text-sm font-medium tracking-wider uppercase mb-3"
        style={{ color: "var(--accent-primary)" }}
      >
        {title}
      </span>
      {subtitle && (
        <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
          {subtitle}
        </h2>
      )}
      <div
        className="mt-4 mx-auto h-1 w-12 rounded-full"
        style={{
          background: "linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))",
          marginLeft: align === "left" ? "0" : "auto",
        }}
      />
    </motion.div>
  );
}
