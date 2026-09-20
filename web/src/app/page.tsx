import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { StackMarquee } from "@/components/sections/StackMarquee";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Contact } from "@/components/sections/Contact";
import { ResumeCerts } from "@/components/sections/ResumeCerts";
import { Footer } from "@/components/sections/Footer";
import { TourGuidePanel } from "@/components/tour/TourGuidePanel";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StackMarquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <CaseStudy />
        <ResumeCerts />
        <Contact />
      </main>
      <Footer />
      <TourGuidePanel />
    </>
  );
}
