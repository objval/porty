"use client";

import { useEffect, useRef } from "react";
import { GitHubLogoIcon, LinkedInLogoIcon, EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

/**
 * Hero section with Neobrutalism styling
 */
export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Add animation to the title on load
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    
    const letters = title.textContent?.split("") || [];
    title.textContent = "";
    
    letters.forEach((letter, index) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.style.display = "inline-block";
      span.style.transform = `rotate(${Math.random() * 8 - 4}deg)`;
      span.style.transition = "all 0.3s ease";
      span.style.opacity = "0";
      span.style.transform = "translateY(20px)";
      
      // Random colors for some letters
      if (Math.random() > 0.8) {
        span.style.color = "var(--primary)";
      }
      
      title.appendChild(span);
      
      // Animate in with delay
      setTimeout(() => {
        span.style.opacity = "1";
        span.style.transform = `rotate(${Math.random() * 8 - 4}deg) translateY(0)`;
      }, 100 + index * 50);
    });
  }, []);
  
  // Scroll to about section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Scroll to projects section
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="min-h-[100vh] relative flex items-center justify-center w-full overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-20 right-32 w-24 h-24 rounded-full bg-indigo-500/30 dark:bg-indigo-500/20 blur-xl" />
      <div className="absolute bottom-32 left-20 w-40 h-40 rounded-full bg-orange-500/20 dark:bg-orange-500/10 blur-xl" />
      <div className="absolute top-1/3 left-1/4 w-6 h-6 rounded-md bg-violet-500 rotate-12 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.7)]" />
      <div className="absolute bottom-1/4 right-1/4 w-10 h-10 rounded-md bg-orange-400 -rotate-12 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.7)]" />
      
      <div className="w-full max-w-7xl px-6 md:px-10 lg:px-12 flex items-center py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr,0.8fr] lg:grid-cols-[1.5fr,1fr] gap-x-16 lg:gap-x-20 items-center w-full">
          {/* Left side with content */}
          <div className="space-y-6 order-2 md:order-1">
            <div className="space-y-2">
              <Badge variant="outline" className="px-3 py-1.5 text-base font-bold border-[2px] border-black bg-violet-500/90 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]">
                Frontend Developer
              </Badge>
              
              <div className="relative">
                <p className="text-2xl font-bold text-muted-foreground">Hello! I'm</p>
                <h1 
                  ref={titleRef}
                  className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground mt-1"
                >
                  objval
                </h1>
                <div className="absolute -right-4 top-0 w-8 h-8 bg-orange-500 rounded-md rotate-12 border-2 border-black -z-10" />
              </div>
              
              <div className="flex flex-wrap gap-3 pt-4">
                <Badge variant="outline" className="px-2.5 py-1 text-sm border-[2px] border-black bg-indigo-500/90 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
                  Next.js
                </Badge>
                <Badge variant="outline" className="px-2.5 py-1 text-sm border-[2px] border-black bg-orange-500/90 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
                  React
                </Badge>
                <Badge variant="outline" className="px-2.5 py-1 text-sm border-[2px] border-black bg-emerald-500/90 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
                  TypeScript
                </Badge>
                <Badge variant="outline" className="px-2.5 py-1 text-sm border-[2px] border-black bg-violet-500/90 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
                  Tailwind CSS
                </Badge>
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              I create <span className="text-indigo-500 dark:text-indigo-400 font-bold">exceptional digital experiences</span> with 
              cutting-edge web technologies. Specializing in building beautiful, 
              high-performance web applications with <span className="text-orange-500 dark:text-orange-400 font-bold">React</span> and <span className="text-violet-500 dark:text-violet-400 font-bold">Next.js</span>.
            </p>
            
            {/* Links and CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                onClick={scrollToProjects}
                className="bg-indigo-500 text-white font-bold px-6 py-6 border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                size="lg"
              >
                View Projects
              </Button>
              
              <Button 
                variant="secondary"
                className="bg-orange-500 text-white font-bold px-6 py-6 border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                size="lg"
              >
                Contact Me
              </Button>
            </div>
            
            {/* Social links */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border-2 border-black rounded-md bg-muted hover:bg-indigo-500 hover:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all"
                aria-label="GitHub Profile"
              >
                <GitHubLogoIcon className="h-6 w-6" />
              </a>
              
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border-2 border-black rounded-md bg-muted hover:bg-orange-500 hover:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedInLogoIcon className="h-6 w-6" />
              </a>
              
              <a
                href="mailto:example@example.com"
                className="p-3 border-2 border-black rounded-md bg-muted hover:bg-violet-500 hover:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all"
                aria-label="Email Contact"
              >
                <EnvelopeOpenIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Right side with image */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end relative">
            <div className="absolute w-24 h-24 -top-5 -left-5 bg-indigo-400 border-[3px] border-black -z-10 rotate-12 shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)]"></div>
            <Card className="relative border-[3px] border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] transform rotate-2 max-w-[280px] md:max-w-[320px] w-full mx-auto md:mx-0 z-10">
              {/* Color overlay for the image */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-violet-500/20 to-orange-500/30 mix-blend-overlay z-20"></div>
              
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 z-30 mix-blend-overlay"></div>
              
              {/* Main image */}
              <img 
                src="https://sdmntprwestus.oaiusercontent.com/files/00000000-11c8-5230-bac2-147ab24c564d/raw?se=2025-04-02T04%3A05%3A19Z&sp=r&sv=2024-08-04&sr=b&scid=25510143-a965-5c60-9a5c-70489c006a0e&skoid=51916beb-8d6a-49b8-8b29-ca48ed86557e&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-01T19%3A43%3A38Z&ske=2025-04-02T19%3A43%3A38Z&sks=b&skv=2024-08-04&sig=ka3qN/kyfE4e8Iswqd0t0fQ6pybH/ouv3Hlt%2BJR0Oh8%3D" 
                alt="Developer portrait" 
                className="object-cover aspect-square w-full z-10"
              />
              
              {/* Floating tech badge */}
              <Badge className="absolute -bottom-2 right-0 -rotate-3 transform translate-y-1/2 bg-orange-500 text-white text-sm font-bold py-1 px-3 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] z-40">
                TypeScript Developer
              </Badge>
              
              {/* Additional diagonal badge */}
              <Badge className="absolute top-6 -left-10 rotate-[-45deg] bg-indigo-500 text-white text-xs font-bold py-1 px-10 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] z-40">
                Available for hire
              </Badge>
            </Card>
            <div className="absolute w-32 h-32 -bottom-8 -right-8 bg-orange-400 border-[3px] border-black -z-10 -rotate-12 shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)]"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce cursor-pointer"
        aria-label="Scroll to about section"
      >
        <span className="text-xs font-bold mb-1">Scroll Down</span>
        <div className="w-10 h-10 rounded-full border-[3px] border-black bg-white flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]">
          <ChevronDown className="h-6 w-6" />
        </div>
      </button>
    </section>
  );
}