"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { projects } from "@/data/projects";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function SketchbookProjects() {
  // Let's just pick the first 3 or 4 projects to feature
  const featuredProjects = projects.slice(0, 3);

  return (
    <section id="projects" className="relative py-24 px-6 sketchbook">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl font-bold mb-4">Featured Scrawls</h2>
          <p className="text-xl max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            A collection of projects that I'm particularly proud of. Every line of code tells a story.
          </p>
          <div className="mt-8 flex justify-end">
            <a href="#projects" className="inline-flex items-center gap-2 font-bold text-lg wavy-underline transition-all">
              View Archive <ArrowRight size={20} />
            </a>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-24"
        >
          {featuredProjects.map((project, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                className={`flex flex-col md:flex-row gap-12 items-center ${isEven ? "" : "md:flex-row-reverse"}`}
              >
                {/* Polaroid Image */}
                <div className="w-full md:w-1/2 relative">
                  {/* Tape and Pin */}
                  <div className="tape" style={{ top: '-10px', left: isEven ? '20px' : 'auto', right: isEven ? 'auto' : '20px', transform: isEven ? 'rotate(-3deg)' : 'rotate(3deg)' }} />
                  <div className="thumbtack" style={{ top: '15px', right: isEven ? '20px' : 'auto', left: isEven ? 'auto' : '20px', background: i % 2 === 0 ? '#ef4444' : '#60a5fa' }} />

                  <a 
                    href={project.liveDemo || project.github || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block wobbly-border bg-white p-3 pb-8 transition-transform hover:scale-[1.02] duration-300"
                    style={{
                      transform: isEven ? 'rotate(-1deg)' : 'rotate(1deg)'
                    }}
                  >
                    <div className="relative aspect-video w-full wobbly-border overflow-hidden" style={{ borderWidth: '2px', boxShadow: 'none' }}>
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#f1f1f1] flex items-center justify-center font-bold text-2xl text-gray-400">
                          {project.title}
                        </div>
                      )}
                    </div>
                  </a>
                </div>

                {/* Project Details */}
                <div className="w-full md:w-1/2 flex flex-col items-start">
                  <h3 className="text-4xl font-bold mb-4">{project.title}</h3>
                  <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.skills.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 font-bold text-sm wobbly-border bg-white"
                        style={{ borderWidth: "2px", boxShadow: "2px 2px 0px 0px #1a1a1a" }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-6">
                    {project.liveDemo && (
                      <a 
                        href={project.liveDemo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-bold text-xl wavy-underline"
                      >
                        Check it out <ArrowRight size={20} className="inline ml-1" />
                      </a>
                    )}
                    {!project.liveDemo && project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-bold text-xl wavy-underline"
                      >
                        View Source <ArrowRight size={20} className="inline ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px border-t-2 border-dashed border-[var(--border-subtle)]" />
    </section>
  );
}
