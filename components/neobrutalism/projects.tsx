"use client";

import { useState, useRef, useEffect } from "react";
import { 
  GithubIcon, 
  ExternalLinkIcon, 
  CodeIcon, 
  TabletIcon, 
  ServerIcon, 
  LayoutIcon, 
  SearchIcon,
  TagIcon,
  ZapIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Define project types
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: "frontend" | "fullstack" | "backend" | "mobile";
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

/**
 * Projects section with chaotic Neobrutalism styling
 */
export function Projects() {
  // Demo projects data
  const allProjects: Project[] = [
    {
      id: 1,
      title: "Neobrutalism Portfolio",
      description: "A personal portfolio website with neobrutalism design aesthetics, featuring interactive components and animations.",
      image: "/projects/portfolio.jpg",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      category: "frontend",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/portfolio",
      featured: true
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "A complete e-commerce solution with product management, cart functionality, and payment processing.",
      image: "/projects/ecommerce.jpg",
      technologies: ["Next.js", "React", "Node.js", "MongoDB", "Stripe"],
      category: "fullstack",
      liveUrl: "https://example.com/ecommerce",
      githubUrl: "https://github.com/example/ecommerce",
      featured: true
    },
    {
      id: 3,
      title: "Content Management System",
      description: "A headless CMS with a modern admin dashboard, role-based access control, and content modeling.",
      image: "/projects/cms.jpg",
      technologies: ["Express.js", "PostgreSQL", "GraphQL", "Docker"],
      category: "backend",
      githubUrl: "https://github.com/example/cms-backend"
    },
    {
      id: 4,
      title: "Workout Tracker App",
      description: "A mobile application for tracking workouts, progress, and setting fitness goals.",
      image: "/projects/fitness.jpg",
      technologies: ["React Native", "Firebase", "Redux", "Expo"],
      category: "mobile",
      liveUrl: "https://apps.apple.com/example"
    },
    {
      id: 5,
      title: "Task Management App",
      description: "A productivity tool for organizing tasks, projects, and teams with real-time collaboration.",
      image: "/projects/tasks.jpg",
      technologies: ["React", "TypeScript", "Node.js", "Socket.io"],
      category: "fullstack",
      liveUrl: "https://example.com/tasks",
      githubUrl: "https://github.com/example/task-manager"
    },
    {
      id: 6,
      title: "Weather Dashboard",
      description: "An interactive weather application with forecast data, location-based insights, and visualizations.",
      image: "/projects/weather.jpg",
      technologies: ["React", "D3.js", "OpenWeather API"],
      category: "frontend",
      liveUrl: "https://example.com/weather",
      githubUrl: "https://github.com/example/weather-app"
    }
  ];

  // State management
  const [projects, setProjects] = useState<Project[]>(allProjects);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const projectsRef = useRef<HTMLDivElement>(null);

  // Filter projects based on category and search term
  useEffect(() => {
    let filtered = allProjects;
    
    if (activeCategory !== "all") {
      filtered = filtered.filter(project => project.category === activeCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    setProjects(filtered);
  }, [activeCategory, searchTerm, allProjects]);

  // Category links
  const categories = [
    { id: "all", label: "All Projects", icon: <LayoutIcon className="h-5 w-5" /> },
    { id: "frontend", label: "Frontend", icon: <CodeIcon className="h-5 w-5" /> },
    { id: "fullstack", label: "Full Stack", icon: <ZapIcon className="h-5 w-5" /> },
    { id: "backend", label: "Backend", icon: <ServerIcon className="h-5 w-5" /> },
    { id: "mobile", label: "Mobile", icon: <TabletIcon className="h-5 w-5" /> }
  ];

  // Get icon for project category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "frontend":
        return <CodeIcon className="h-5 w-5" />;
      case "backend":
        return <ServerIcon className="h-5 w-5" />;
      case "fullstack":
        return <ZapIcon className="h-5 w-5" />;
      case "mobile":
        return <TabletIcon className="h-5 w-5" />;
      default:
        return <LayoutIcon className="h-5 w-5" />;
    }
  };

  // Get color for project category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "bg-indigo-500";
      case "backend":
        return "bg-emerald-500";
      case "fullstack":
        return "bg-orange-500";
      case "mobile":
        return "bg-violet-500";
      default:
        return "bg-blue-500";
    }
  };

  // Create a random rotation for each card to make the grid chaotic
  const getRandomRotation = (id: number) => {
    const rotations = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-1', 'rotate-0'];
    return rotations[id % rotations.length];
  };

  // Create a random transform for each card to make the grid chaotic
  const getRandomTransform = (id: number) => {
    const transforms = [
      'translate-x-2 -translate-y-1',
      '-translate-x-2 translate-y-1',
      'translate-x-0 translate-y-2',
      '-translate-x-1 -translate-y-2',
      'translate-x-3 translate-y-0',
      'translate-x-0 translate-y-0'
    ];
    return transforms[id % transforms.length];
  };

  return (
    <section 
      id="projects" 
      ref={projectsRef}
      className="min-h-screen w-full py-20 px-4 md:px-6 lg:px-8 relative"
    >
      {/* Section Header */}
      <div className="text-center mb-16 relative">
        <h2 className="text-4xl md:text-5xl font-extrabold inline-block relative transform -rotate-1">
          <span className="relative inline-block">
            My Projects
            <div className="absolute -bottom-3 left-0 right-0 h-3 bg-orange-500 -z-10 transform rotate-1"></div>
          </span>
        </h2>
        <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
          A collection of my recent work, showcasing web applications, mobile apps, and more.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between max-w-7xl mx-auto">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                px-4 py-2 border-[3px] border-black transition-all 
                hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)] 
                ${activeCategory === category.id 
                  ? "bg-orange-500 text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)]" 
                  : "bg-white text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]"
                }
                ${category.id === "all" ? "rotate-1" :
                  category.id === "frontend" ? "-rotate-2" :
                  category.id === "fullstack" ? "rotate-1" :
                  category.id === "backend" ? "-rotate-1" :
                  "rotate-2"
                }
              `}
            >
              <div className="flex items-center gap-2">
                {category.icon}
                <span>{category.label}</span>
              </div>
            </Button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-auto relative">
          <div className="relative w-full md:w-[300px] transform rotate-1">
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 py-2 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Projects Grid - Chaotic neobrutalist layout */}
      <div className="max-w-7xl mx-auto">
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {projects.map((project) => (
              <div
                key={project.id}
                className={cn(
                  "h-full transform transition-transform duration-300 hover:scale-[1.03]",
                  getRandomRotation(project.id),  
                  getRandomTransform(project.id)
                )}
              >
                <Card className={cn(
                  "h-full overflow-hidden border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.8)] transition-all"
                )}>
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay z-20"></div>
                    
                    {/* Image */}
                    <Image
                      src={project.image || "https://placehold.co/600x400/indigo/white"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.05]"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300"></div>
                    
                    {/* Featured Badge */}
                    {project.featured && (
                      <Badge className={cn(
                        "absolute top-4 left-4 z-30 px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]",
                        getCategoryColor(project.category),
                        project.id % 2 === 0 ? "rotate-2" : "-rotate-2"
                      )}>
                        <TagIcon className="h-4 w-4 mr-1" />
                        Featured
                      </Badge>
                    )}
                    
                    {/* Category Badge */}
                    <Badge className={cn(
                      "absolute top-4 right-4 z-30 px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]",
                      getCategoryColor(project.category),
                      project.id % 2 === 0 ? "-rotate-1" : "rotate-1"
                    )}>
                      {getCategoryIcon(project.category)}
                      <span className="ml-1">{project.category}</span>
                    </Badge>
                  </div>
                  
                  {/* Content */}
                  <CardContent className="p-5 border-t-3 border-black">
                    <h3 className="text-2xl font-bold mb-2 transition-colors hover:text-primary">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <Badge 
                          key={i} 
                          variant="outline" 
                          className={cn(
                            "bg-muted border-2 border-black",
                            i % 2 === 0 ? "rotate-1" : "-rotate-1"
                          )}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  {/* Footer with links */}
                  <CardFooter className="p-5 pt-0 flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white font-bold border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all transform rotate-1"
                      >
                        <GithubIcon className="h-5 w-5" />
                        <span>Code</span>
                      </a>
                    )}
                    
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 text-white font-bold border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all transform -rotate-1",
                          getCategoryColor(project.category)
                        )}
                      >
                        <ExternalLinkIcon className="h-5 w-5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] p-10 text-center bg-muted transform -rotate-1">
            <SearchIcon className="h-16 w-16 mb-6 text-muted-foreground" />
            <h3 className="text-2xl font-bold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6">
              Try changing your search term or selecting a different category.
            </p>
            <Button 
              onClick={() => {
                setActiveCategory("all");
                setSearchTerm("");
              }}
              className="px-6 py-2 bg-primary text-white font-bold border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] transform rotate-1"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
      
      {/* Decorative Element (reduced) */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-400 border-[3px] border-black -z-10 rotate-12 opacity-70"></div>
    </section>
  );
} 