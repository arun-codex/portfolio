"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { hasVisitedBefore, markVisited } from "@/lib/utils";
import { personal } from "@/data/personal";

export function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (hasVisitedBefore()) {
      setIsLoading(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setIsLoading(false);
      markVisited();
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !isLoading) return null;

  return (
    <div
      className="loading-screen"
      style={{
        transition: "opacity 0.3s ease-in-out",
        pointerEvents: isLoading ? "auto" : "none",
      }}
    >
      <div className="text-center">
        <div className="absolute inset-0 grid-bg opacity-20" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span
            className="font-mono text-lg font-semibold"
            style={{ color: "var(--accent-primary)" }}
          >
            {personal.name.split(" ")[0].toLowerCase()}
            <span style={{ color: "var(--text-muted)" }}>@portfolio</span>
          </span>
          <motion.div
            className="mt-4 mx-auto h-0.5 rounded-full"
            style={{ background: "var(--accent-primary)" }}
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          />
        </motion.div>
      </div>
    </div>
  );
}
