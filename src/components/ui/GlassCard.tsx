"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHover, cardTap } from "@/lib/animations";
import { type ReactNode } from "react";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? cardHover : undefined}
      whileTap={hover ? cardTap : undefined}
      className={cn(
        "glass rounded-[var(--radius-lg)] p-6",
        hover && "glass-hover cursor-default",
        glow && "shadow-[var(--shadow-glow)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
