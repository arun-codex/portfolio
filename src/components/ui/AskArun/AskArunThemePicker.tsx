"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";
import {
  askArunThemes,
  type AskArunThemeId,
  type AskArunThemeDefinition,
} from "@/data/ask-arun-themes";

interface AskArunThemePickerProps {
  currentThemeId: AskArunThemeId;
  onSelectTheme: (themeId: AskArunThemeId) => void;
}

export function AskArunThemePicker({
  currentThemeId,
  onSelectTheme,
}: AskArunThemePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const themesList = Object.values(askArunThemes);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        className="ask-arun-icon-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        title="Customize Ask Arun theme"
        aria-label="Change Ask Arun theme"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <Palette size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 max-w-[calc(100vw-32px)] rounded-lg p-2 shadow-2xl z-50 overflow-hidden"
            style={{
              background: "var(--panel-bg, #0f172a)",
              border: "1px solid var(--panel-border, rgba(139, 92, 246, 0.3))",
              backdropFilter: "blur(12px)",
            }}
            role="menu"
            aria-orientation="vertical"
            aria-label="Ask Arun visual themes"
          >
            <div className="px-2 py-1 mb-1 text-[10px] font-mono font-semibold uppercase tracking-widest text-[var(--text-muted)] border-b border-[var(--panel-border)]">
              Ask Arun Appearance
            </div>
            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto pr-1">
              {themesList.map((t: AskArunThemeDefinition) => {
                const isActive = t.id === currentThemeId;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="menuitemradio"
                    aria-checked={isActive}
                    onClick={() => {
                      onSelectTheme(t.id);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-md text-xs transition-all duration-150 text-left group"
                    style={{
                      background: isActive
                        ? "rgba(255, 255, 255, 0.1)"
                        : "transparent",
                      color: "var(--text-primary)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {/* Swatch color dots */}
                      <div className="flex items-center -space-x-1 shrink-0">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/30"
                          style={{ background: t.previewColors[0] }}
                        />
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/30"
                          style={{ background: t.previewColors[1] }}
                        />
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/30"
                          style={{ background: t.previewColors[2] }}
                        />
                      </div>
                      <span className="font-medium">{t.name}</span>
                    </div>

                    {isActive && (
                      <Check size={14} className="text-[var(--accent-primary)] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
