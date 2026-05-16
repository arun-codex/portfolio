"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { Send } from "lucide-react";
import { useState } from "react";

export function SketchbookContact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate sending
    setTimeout(() => setStatus("sent"), 1500);
  };

  return (
    <section id="contact" className="relative py-24 px-6 sketchbook">
      <div className="max-w-4xl mx-auto relative mt-16">
        
        {/* Floating Paper Plane */}
        <div className="absolute -top-8 -right-8 float-slow z-20">
          <Send size={48} className="text-[var(--accent-primary)] fill-[var(--accent-primary)] opacity-80 -rotate-12" />
        </div>

        {/* Sticky Note Container */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="wobbly-border p-8 md:p-16 relative transform rotate-1"
          style={{
            background: "#fef9c3", // yellow-100
            boxShadow: "10px 10px 0px 0px rgba(0,0,0,0.1)",
          }}
        >
          <h2 className="text-5xl font-bold mb-10">Let's Start a Conversation</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xl font-bold">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  placeholder="Penman Smith"
                  className="wobbly-border px-4 py-3 bg-[rgba(255,255,255,0.5)] focus:bg-white outline-none transition-colors"
                  style={{ borderWidth: "2px", boxShadow: "none" }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xl font-bold">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  placeholder="penman@sketch.com"
                  className="wobbly-border px-4 py-3 bg-[rgba(255,255,255,0.5)] focus:bg-white outline-none transition-colors"
                  style={{ borderWidth: "2px", boxShadow: "none" }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xl font-bold">The Big Idea</label>
              <textarea 
                id="message" 
                rows={5}
                required
                placeholder="I have this crazy idea for a website..."
                className="wobbly-border px-4 py-3 bg-[rgba(255,255,255,0.5)] focus:bg-white outline-none transition-colors resize-none"
                style={{ borderWidth: "2px", boxShadow: "none" }}
              />
            </div>

            <button 
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="wobbly-border mt-4 w-full py-4 text-xl font-bold text-white transition-all hover:scale-[1.01] active:scale-[0.99] sketch-card"
              style={{
                background: "#1a1a1a",
                boxShadow: "6px 6px 0px 0px rgba(0,0,0,0.2)",
              }}
            >
              {status === "idle" && "Send Sketch Message"}
              {status === "sending" && "Sending..."}
              {status === "sent" && "Message Delivered!"}
              {status === "error" && "Error. Try again."}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
