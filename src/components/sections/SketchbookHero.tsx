"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/personal";
import { Code, Pencil, Wand2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function SketchbookHero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden sketchbook"
    >
      {/* Background Dots */}
      <div className="absolute inset-0 paper-dots -z-10" />

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 left-[10%] float-slow" style={{ animationDelay: "0s" }}>
        <Pencil size={48} className="text-[var(--accent-primary)] opacity-80" strokeWidth={1.5} />
      </div>
      <div className="absolute top-1/3 right-[15%] float-slow" style={{ animationDelay: "1s" }}>
        <Code size={56} className="text-[var(--accent-secondary)] opacity-80" strokeWidth={1.5} />
      </div>
      <div className="absolute bottom-1/4 left-[20%] float-slow" style={{ animationDelay: "2s" }}>
        <Wand2 size={40} className="text-[var(--accent-red)] opacity-80" strokeWidth={1.5} />
      </div>
      <div className="absolute bottom-1/3 right-[20%] float-slow" style={{ animationDelay: "3s" }}>
        <Sparkles size={48} className="text-[var(--accent-yellow)] opacity-80" strokeWidth={1.5} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center"
      >
        {/* Availability Sticky Note */}
        <div 
          className="mb-8 px-4 py-1 text-sm font-bold uppercase tracking-wider transform -rotate-2 wobbly-border"
          style={{
            background: "var(--accent-yellow)",
            borderWidth: "2px",
            boxShadow: "3px 3px 0px 0px #1a1a1a",
          }}
        >
          Available for hire
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-8xl lg:text-[96px] leading-[0.95] font-bold mb-8">
          Crafting Digital<br/>
          Masterpieces One<br/>
          <span className="scribble-underline relative inline-block">Pixel</span> at a Time.
        </h1>

        {/* Bio */}
        <p className="lead max-w-2xl mx-auto mb-10 text-center">
          Hi! I'm {personal.name.split(" ")[0]}. A creative developer who builds websites that feel like they were sketched just for you.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-6 justify-center">
          <a
            href="#projects"
            className="wobbly-border px-8 py-4 text-xl font-bold transition-all sketch-card bg-[var(--accent-primary)] text-white hover:bg-[#ea8332]"
            style={{
              textDecoration: "none"
            }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="wobbly-border px-8 py-4 text-xl font-bold transition-all sketch-card bg-white"
            style={{
              textDecoration: "none"
            }}
          >
            Say Hello!
          </a>
        </div>
      </motion.div>
    </section>
  );
}
