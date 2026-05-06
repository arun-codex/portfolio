"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navbarVariants, mobileMenuVariants } from "@/lib/animations";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useThemeContext } from "@/components/providers/ThemeProvider";
import { navLinks, personal } from "@/data/personal";
import { cn } from "@/lib/utils";
import { Sun, Moon, Menu, X } from "lucide-react";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds);
  const { theme, toggleTheme, mounted } = useThemeContext();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <motion.header
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass shadow-md"
          : "bg-transparent"
      )}
    >
      <nav
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#home"
          className="font-mono text-sm font-semibold tracking-tight transition-colors"
          style={{ color: "var(--accent-primary)" }}
          aria-label="Go to top"
        >
          {personal.name.split(" ")[0].toLowerCase()}
          <span style={{ color: "var(--text-muted)" }}>@portfolio</span>
          <span className="cursor-blink" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-[var(--radius-sm)] transition-all duration-200",
                activeId === link.href.replace("#", "")
                  ? "bg-[var(--accent-primary-glow)]"
                  : "hover:bg-[var(--bg-surface-hover)]"
              )}
              style={{
                color:
                  activeId === link.href.replace("#", "")
                    ? "var(--accent-primary)"
                    : "var(--text-secondary)",
              }}
            >
              {link.label}
            </a>
          ))}

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-[var(--radius-sm)] transition-colors hover:bg-[var(--bg-surface-hover)]"
              style={{ color: "var(--text-secondary)" }}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-[var(--radius-sm)]"
              style={{ color: "var(--text-secondary)" }}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-[var(--radius-sm)]"
            style={{ color: "var(--text-primary)" }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-16 right-0 bottom-0 w-72 md:hidden p-6 flex flex-col gap-2"
              style={{ background: "var(--bg-surface)", borderLeft: "1px solid var(--border-subtle)" }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium rounded-[var(--radius-sm)] transition-all",
                    activeId === link.href.replace("#", "")
                      ? "bg-[var(--accent-primary-glow)]"
                      : ""
                  )}
                  style={{
                    color:
                      activeId === link.href.replace("#", "")
                        ? "var(--accent-primary)"
                        : "var(--text-secondary)",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
