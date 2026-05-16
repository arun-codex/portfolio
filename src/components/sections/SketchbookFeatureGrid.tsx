"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { MonitorSmartphone, Code2, Zap } from "lucide-react";

const features = [
  {
    title: "UI/UX Design",
    description: "I design interfaces that are not just pretty, but feel human and intuitive. Sketches first, code later.",
    icon: MonitorSmartphone,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    rotation: "-rotate-1",
  },
  {
    title: "Web Development",
    description: "Building robust, clean codebases using modern tech stacks like React, Next.js, and Tailwind.",
    icon: Code2,
    iconColor: "text-green-500",
    iconBg: "bg-green-50",
    rotation: "rotate-2",
  },
  {
    title: "Performance",
    description: "Lightning fast load times and optimized experiences that keep users happy and engaged.",
    icon: Zap,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
    rotation: "-rotate-2",
  },
];

export function SketchbookFeatureGrid() {
  return (
    <section id="skills" className="relative py-24 px-6 sketchbook">
      {/* Decorative dashed divider */}
      <div className="absolute top-0 left-0 right-0 h-px border-t-2 border-dashed border-[var(--border-subtle)]" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">What I Can Do</h2>
          <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
            Turning wild ideas into clickable reality
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              className={`wobbly-border sketch-card p-8 bg-white flex flex-col items-start ${feature.rotation} hover:!rotate-0 transition-all duration-300`}
            >
              <div 
                className={`wobbly-border p-4 mb-6 flex items-center justify-center ${feature.iconBg}`}
                style={{
                  borderWidth: "2px",
                  boxShadow: "none"
                }}
              >
                <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px border-t-2 border-dashed border-[var(--border-subtle)]" />
    </section>
  );
}
