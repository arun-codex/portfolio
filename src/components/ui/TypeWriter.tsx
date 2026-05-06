"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export function TypeWriter({ words }: { words: readonly string[] }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const type = useCallback(() => {
    const currentWord = words[currentWordIndex];

    if (!isDeleting) {
      setCurrentText(currentWord.substring(0, currentText.length + 1));
      if (currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else {
      setCurrentText(currentWord.substring(0, currentText.length - 1));
      if (currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
    }
  }, [currentText, currentWordIndex, isDeleting, words]);

  useEffect(() => {
    const speed = isDeleting ? 50 : 100;
    const timer = setTimeout(type, speed);
    return () => clearTimeout(timer);
  }, [type, isDeleting]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key="typewriter"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="cursor-blink"
        style={{ color: "var(--accent-primary)" }}
        aria-label={words[currentWordIndex]}
      >
        {currentText}
      </motion.span>
    </AnimatePresence>
  );
}
