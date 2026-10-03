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
import { certifications, contact, skillCategories } from "@/data/portfolio";

// schema.org ProfilePage + Person, built from the same data the page shows,
// so search engines get the facts without scraping the design.
const SITE = contact.website;
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE}/#profile`,
  url: `${SITE}/`,
  name: "Preksha Barjatya – AI Engineer",
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE}/#person`,
    name: "Preksha Barjatya",
    jobTitle: "AI Engineer",
    url: `${SITE}/`,
    image: `${SITE}/preksha-illustration.jpg`,
    email: `mailto:${contact.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Indore", addressRegion: "Madhya Pradesh", addressCountry: "IN" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Acropolis Institute of Technology and Research" },
    worksFor: { "@type": "Organization", name: "Santerra Hygiene Pvt. Ltd." },
    knowsAbout: skillCategories
      .filter((c) => ["skill-programming", "skill-ai-ml", "skill-backend"].includes(c.id))
      .flatMap((c) => c.items),
    hasCredential: certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.title,
      recognizedBy: { "@type": "Organization", name: c.org },
    })),
    sameAs: [contact.github, contact.linkedin],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
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
