"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTerminal } from "@/hooks/useTerminal";

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { lines, execute, navigateHistory } = useTerminal();
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut: Ctrl + `
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Auto-focus input and scroll to bottom
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      execute(input);
      setInput("");
    },
    [input, execute]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = navigateHistory("up");
        setInput(prev);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = navigateHistory("down");
        setInput(next);
      }
    },
    [navigateHistory]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="terminal-overlay"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-label="Terminal"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="terminal-window"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: "#ff5f57" }} />
              <div className="terminal-dot" style={{ background: "#febc2e" }} />
              <div className="terminal-dot" style={{ background: "#28c840" }} />
              <span
                className="ml-3 text-xs font-mono"
                style={{ color: "var(--text-muted)" }}
              >
                arun@portfolio:~
              </span>
            </div>

            {/* Body */}
            <div className="terminal-body" ref={bodyRef}>
              {lines.map((line, i) => (
                <div key={i} className={line.type === "input" ? "prompt" : line.type === "error" ? "text-red-400" : "output"}>
                  {line.content}
                </div>
              ))}

              {/* Input */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
                <span className="prompt">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none font-mono text-sm"
                  style={{ color: "#c9d1d9" }}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
