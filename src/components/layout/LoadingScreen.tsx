"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadingVariants } from "@/lib/animations";
import { hasVisitedBefore, markVisited } from "@/lib/utils";
import { personal } from "@/data/personal";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Skip loading for returning visitors
    if (hasVisitedBefore()) {
      setIsLoading(false);
      return;
    }

    setShouldShow(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      markVisited();
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          variants={loadingVariants}
          initial="visible"
          exit="exit"
          className="loading-screen"
        >
          <div className="text-center">
            {/* Subtle grid */}
            <div className="absolute inset-0 grid-bg opacity-20" aria-hidden="true" />

            {/* Brand */}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
