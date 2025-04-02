import { Navbar } from "@/components/neobrutalism/navbar";
import { Hero } from "@/components/neobrutalism/hero";
import { InfoGame } from "@/components/neobrutalism/info-game";
import { BackgroundAnimation } from "@/components/neobrutalism/background-animation";
import { Projects } from "@/components/neobrutalism/projects";

/**
 * Home page with Neobrutalism design
 */
export default function Home() {
  return (
    <main className="relative min-h-svh overflow-hidden">
      {/* Background animation that responds to scroll */}
      <BackgroundAnimation />
      
      {/* Navbar with theme selector */}
      <Navbar />
      
      {/* Hero section */}
      <Hero />
      
      {/* Projects section */}
      <Projects />
      
      {/* Info game section */}
      <InfoGame />
    </main>
  );
}
