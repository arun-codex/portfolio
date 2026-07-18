"use client";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Terminal } from "@/components/ui/Terminal";
import { ScanlineOverlay } from "@/components/ui/ScanlineOverlay";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";
import { SketchbookHero } from "@/components/sections/SketchbookHero";
import { SketchbookFeatureGrid } from "@/components/sections/SketchbookFeatureGrid";
import { SketchbookProjects } from "@/components/sections/SketchbookProjects";
import { SketchbookContact } from "@/components/sections/SketchbookContact";
import { CyberpunkDataBar } from "@/components/sections/CyberpunkDataBar";
import { CyberpunkServicesGrid } from "@/components/sections/CyberpunkServicesGrid";
import { CyberpunkCTA } from "@/components/sections/CyberpunkCTA";
import { VelorahHero } from "@/components/sections/VelorahHero";
import { useThemeContext } from "@/components/providers/ThemeProvider";

function PageContent() {
  const { theme } = useThemeContext();
  const isCyberpunk = theme === "cyberpunk";
  const isSketchbook = theme === "sketchbook";
  const isVelorah = theme === "velorah";

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <ScanlineOverlay />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        {isVelorah ? <VelorahHero /> : isSketchbook ? <SketchbookHero /> : <Hero />}
        {isCyberpunk && <CyberpunkDataBar />}
        <About />
        {isSketchbook ? <SketchbookFeatureGrid /> : <Skills />}
        {isCyberpunk && <CyberpunkServicesGrid />}
        {isSketchbook ? <SketchbookProjects /> : <Projects />}
        <Certifications />
        <Resume />
        {isCyberpunk && <CyberpunkCTA />}
        {isSketchbook ? <SketchbookContact /> : <Contact />}
      </main>
      <Footer />
      <Terminal />
    </>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <PageContent />
    </ThemeProvider>
  );
}
