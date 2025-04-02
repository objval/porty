"use client";

import { useState, useEffect } from "react";
import { 
  HomeIcon, 
  FolderIcon, 
  CodeIcon, 
  MailIcon, 
  PaletteIcon,
  SunIcon,
  MoonIcon,
  StarIcon,
  ArrowUpIcon
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { baseColors } from "@/lib/colors";
import { useThemeContext } from "@/lib/theme-context";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

/**
 * Modern Neobrutalism style navbar with integrated theme selector
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { activeTheme, setActiveTheme } = useThemeContext();
  const { theme: colorMode, setTheme } = useTheme();
  
  // Handle scroll events to update navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Function to get the appropriate color for the active theme
  const getActiveColor = (themeName: string) => {
    const theme = baseColors.find(color => color.name === themeName);
    return theme?.activeColor[colorMode === "dark" ? "dark" : "light"] || "";
  };
  
  // Scroll to top function for the home button
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const navLinks = [
    { href: "#", label: "Home", icon: <ArrowUpIcon className="h-5 w-5" />, onClick: scrollToTop },
    { href: "#about", label: "About", icon: <HomeIcon className="h-5 w-5" /> },
    { href: "#projects", label: "Projects", icon: <FolderIcon className="h-5 w-5" /> },
    { href: "#skills", label: "Skills", icon: <CodeIcon className="h-5 w-5" /> },
    { href: "#contact", label: "Contact", icon: <MailIcon className="h-5 w-5" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Desktop and Tablet Navbar */}
      <nav 
        className={cn(
          "hidden md:block px-6 lg:px-10 transition-all duration-300 ease-in-out",
          scrolled 
            ? "py-3 bg-white/25 dark:bg-black/25 backdrop-blur-md border-b-[3px] border-black shadow-[0_5px_0px_0px_rgba(0,0,0,0.8)]"
            : "py-5"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-wider uppercase hover:scale-105 transition-transform cursor-pointer" onClick={scrollToTop}>
              <span className="inline-block transform -rotate-3 text-indigo-500 hover:animate-pulse">obj</span>
              <span className="inline-block transform rotate-2 text-orange-500 hover:animate-pulse">val</span>
            </h1>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {navLinks.map((link) => (
              <TooltipProvider key={link.label} delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href={link.href}
                      onClick={(e) => {
                        if (link.onClick) {
                          e.preventDefault();
                          link.onClick();
                        }
                      }}
                      className={cn(
                        "px-4 py-2.5 font-bold border-[3px] border-black bg-white text-black hover:text-white transform transition-all flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)]",
                        link.label === "Home" 
                          ? "hover:bg-gradient-to-r hover:from-indigo-500 hover:to-violet-500 hover:rotate-1" 
                          : link.label === "About"
                          ? "hover:bg-emerald-500 hover:-rotate-1"
                          : link.label === "Projects"
                          ? "hover:bg-orange-500 hover:rotate-1"
                          : link.label === "Skills"
                          ? "hover:bg-cyan-500 hover:-rotate-1"
                          : "hover:bg-pink-500 hover:rotate-1"
                      )}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    className="border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]"
                  >
                    {link.label}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            
            {/* Integrated Theme Selector */}
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  className="px-4 py-2.5 ml-2 font-bold border-[3px] border-black bg-violet-500 text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-purple-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)] transition-all flex items-center gap-2 hover:rotate-1"
                >
                  <PaletteIcon className="h-5 w-5" />
                  <span>Theme</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-auto p-4 border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)] bg-white"
              >
                <div className="space-y-4 min-w-[280px]">
                  {/* Color Theme Selector */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-sm border-b-2 border-black pb-1">Color Theme</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {baseColors.map((color) => (
                        <Button
                          key={color.name}
                          onClick={() => setActiveTheme(color.name)}
                          className={cn(
                            "justify-start h-auto py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] transition-all",
                            activeTheme === color.name && "border-[3px]"
                          )}
                          style={{
                            backgroundColor: activeTheme === color.name ? getActiveColor(color.name) : "white",
                            color: activeTheme === color.name ? "white" : "black",
                          }}
                        >
                          <span
                            className={cn(
                              "mr-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-black"
                            )}
                            style={{
                              backgroundColor: getActiveColor(color.name),
                            }}
                          >
                            {activeTheme === color.name && <StarIcon className="h-3 w-3 text-white" />}
                          </span>
                          {color.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Light/Dark Mode Selector */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-sm border-b-2 border-black pb-1">Color Mode</h3>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setTheme("light")}
                        className={cn(
                          "justify-start flex-1 h-auto py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] transition-all",
                          colorMode === "light" && "border-[3px] bg-orange-500 text-white"
                        )}
                      >
                        <SunIcon className="mr-2 h-4 w-4" />
                        Light
                      </Button>
                      <Button
                        onClick={() => setTheme("dark")}
                        className={cn(
                          "justify-start flex-1 h-auto py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] transition-all",
                          colorMode === "dark" && "border-[3px] bg-indigo-500 text-white"
                        )}
                      >
                        <MoonIcon className="mr-2 h-4 w-4" />
                        Dark
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>
      
      {/* Mobile Floating Navbar */}
      <nav className={cn(
        "md:hidden fixed top-4 left-4 right-4 rounded-lg border-[3px] border-black bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)] transition-all duration-300 ease-in-out",
        scrolled && "top-2"
      )}>
        <div className="flex items-center justify-between p-3">
          {/* Logo */}
          <h1 className="text-xl font-bold tracking-wider uppercase rotate-1 transform cursor-pointer" onClick={scrollToTop}>
            <span className="inline-block transform -rotate-3 text-indigo-500">obj</span>
            <span className="inline-block transform rotate-2 text-orange-500">val</span>
          </h1>
          
          {/* Mobile Navigation */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <TooltipProvider key={link.label} delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.onClick) {
                          e.preventDefault();
                          link.onClick();
                        }
                      }}
                      className={cn(
                        "p-2 border-2 border-black rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:text-white transition-all",
                        link.label === "Home" 
                          ? "hover:bg-gradient-to-r hover:from-indigo-500 hover:to-violet-500" 
                          : link.label === "About"
                          ? "hover:bg-emerald-500"
                          : link.label === "Projects"
                          ? "hover:bg-orange-500"
                          : link.label === "Skills"
                          ? "hover:bg-cyan-500" 
                          : "hover:bg-pink-500"
                      )}
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    className="border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]"
                  >
                    {link.label}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            
            {/* Mobile Theme Button */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="p-2 border-2 border-black rounded-md bg-violet-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:bg-gradient-to-r hover:from-violet-500 hover:to-purple-500 transition-all"
                  aria-label="Theme selector"
                >
                  <PaletteIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-72 p-4 border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)] bg-white"
              >
                <div className="space-y-4">
                  {/* Color Theme Selector */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-sm border-b-2 border-black pb-1">Color Theme</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {baseColors.map((color) => (
                        <Button
                          key={color.name}
                          onClick={() => setActiveTheme(color.name)}
                          className={cn(
                            "justify-start h-auto py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] transition-all",
                            activeTheme === color.name && "border-[3px]"
                          )}
                          style={{
                            backgroundColor: activeTheme === color.name ? getActiveColor(color.name) : "white",
                            color: activeTheme === color.name ? "white" : "black",
                          }}
                        >
                          <span
                            className={cn(
                              "mr-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-black"
                            )}
                            style={{
                              backgroundColor: getActiveColor(color.name),
                            }}
                          >
                            {activeTheme === color.name && <StarIcon className="h-3 w-3 text-white" />}
                          </span>
                          {color.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Light/Dark Mode Selector */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-sm border-b-2 border-black pb-1">Color Mode</h3>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setTheme("light")}
                        className={cn(
                          "justify-start flex-1 h-auto py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] transition-all",
                          colorMode === "light" && "border-[3px] bg-orange-500 text-white"
                        )}
                      >
                        <SunIcon className="mr-2 h-4 w-4" />
                        Light
                      </Button>
                      <Button
                        onClick={() => setTheme("dark")}
                        className={cn(
                          "justify-start flex-1 h-auto py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] transition-all",
                          colorMode === "dark" && "border-[3px] bg-indigo-500 text-white"
                        )}
                      >
                        <MoonIcon className="mr-2 h-4 w-4" />
                        Dark
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>
    </header>
  );
} 