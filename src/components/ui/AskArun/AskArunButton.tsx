"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AskArunPanel } from "./AskArunPanel";

/**
 * AskArunButton — floating ✦ button fixed to the bottom-right corner.
 *
 * Behaviour:
 * - One-time subtle pulse on first render (respects prefers-reduced-motion)
 * - Tooltip "Ask Arun" on hover
 * - Clicking opens/closes the chat panel
 * - Escape key closes the panel
 */
export function AskArunButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="ask-arun-trigger-wrapper"
            aria-label="Ask Arun AI assistant"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Tooltip */}
            <motion.span
              className="ask-arun-tooltip"
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15, delay: 0.1 }}
              aria-hidden="true"
            >
              Ask Arun
            </motion.span>

            <motion.button
              className="ask-arun-fab"
              onClick={handleToggle}
              aria-label="Open Ask Arun AI assistant"
              aria-expanded={isOpen}
              aria-haspopup="dialog"
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <SparkIcon />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AskArunPanel isOpen={isOpen} onClose={handleClose} />
    </>
  );
}

/* ── Icons ──────────────────────────────────────────────────────────────── */

function SparkIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z"
        fill="currentColor"
      />
    </svg>
  );
}
