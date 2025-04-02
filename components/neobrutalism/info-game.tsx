"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  Gamepad2Icon, 
  LightbulbIcon, 
  BrainIcon, 
  RocketIcon, 
  StarIcon,
  XIcon
} from "lucide-react";

interface InfoItem {
  id: number;
  category: "skills" | "experience" | "education" | "hobbies" | "facts";
  title: string;
  content: string;
  discovered: boolean;
}

/**
 * Interactive info game component with Neobrutalism styling
 * Allows users to discover information through a simple interactive game
 */
export function InfoGame() {
  const [infoItems, setInfoItems] = useState<InfoItem[]>([
    { 
      id: 1, 
      category: "skills", 
      title: "TypeScript Expert", 
      content: "5+ years of TypeScript development experience, specializing in type safety and design patterns.", 
      discovered: false 
    },
    { 
      id: 2, 
      category: "skills", 
      title: "React Ninja", 
      content: "Deep knowledge of React's internals and performance optimization techniques.", 
      discovered: false 
    },
    { 
      id: 3, 
      category: "skills", 
      title: "Next.js Wizard", 
      content: "Built multiple production applications with Next.js, focusing on server components and data fetching.", 
      discovered: false 
    },
    { 
      id: 4, 
      category: "experience", 
      title: "Senior Frontend Engineer", 
      content: "Worked at TechCorp leading a team of 5 developers on a customer-facing application.", 
      discovered: false 
    },
    { 
      id: 5, 
      category: "experience", 
      title: "Startup Founder", 
      content: "Co-founded a SaaS startup focusing on developer productivity tools.", 
      discovered: false 
    },
    { 
      id: 6, 
      category: "education", 
      title: "Computer Science Degree", 
      content: "Bachelor's in Computer Science with a focus on algorithms and data structures.", 
      discovered: false 
    },
    { 
      id: 7, 
      category: "hobbies", 
      title: "Open Source Contributor", 
      content: "Regular contributor to React and TypeScript ecosystem projects.", 
      discovered: false 
    },
    { 
      id: 8, 
      category: "facts", 
      title: "Conference Speaker", 
      content: "Presented at multiple tech conferences on frontend architecture and best practices.", 
      discovered: false 
    },
    { 
      id: 9, 
      category: "facts", 
      title: "World Traveler", 
      content: "Visited over 20 countries, working remotely while experiencing different cultures.", 
      discovered: false 
    },
  ]);
  
  const [currentPosition, setCurrentPosition] = useState(0);
  const [discoveredCount, setDiscoveredCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  
  // Start game on button click
  const handleStartGame = () => {
    setGameStarted(true);
  };
  
  // Handle arrow key navigation
  const handleMove = (direction: "up" | "down" | "left" | "right") => {
    // Close expanded item if any
    setExpandedItem(null);
    
    const gridSize = Math.ceil(Math.sqrt(infoItems.length));
    let newPosition = currentPosition;
    
    switch (direction) {
      case "up":
        newPosition = currentPosition - gridSize;
        if (newPosition < 0) newPosition += infoItems.length;
        break;
      case "down":
        newPosition = currentPosition + gridSize;
        if (newPosition >= infoItems.length) newPosition -= infoItems.length;
        break;
      case "left":
        if (currentPosition % gridSize === 0) {
          newPosition = currentPosition + gridSize - 1;
        } else {
          newPosition = currentPosition - 1;
        }
        break;
      case "right":
        if (currentPosition % gridSize === gridSize - 1) {
          newPosition = currentPosition - gridSize + 1;
        } else {
          newPosition = currentPosition + 1;
        }
        break;
    }
    
    setCurrentPosition(newPosition);
  };
  
  // Handle discovery of an item
  const handleDiscover = () => {
    if (!gameStarted) return;
    
    const itemIndex = currentPosition % infoItems.length;
    if (infoItems[itemIndex].discovered) {
      setExpandedItem(itemIndex);
      return;
    }
    
    const newItems = [...infoItems];
    newItems[itemIndex].discovered = true;
    setInfoItems(newItems);
    setDiscoveredCount(discoveredCount + 1);
    setExpandedItem(itemIndex);
  };
  
  // Handle clicking on a grid item
  const handleItemClick = (index: number) => {
    if (!gameStarted) return;
    
    if (infoItems[index].discovered) {
      // Toggle the expanded view
      setExpandedItem(expandedItem === index ? null : index);
    } else if (index === currentPosition) {
      // If it's the current position but not discovered, discover it
      handleDiscover();
    } else {
      // If it's not the current position and not discovered, navigate to it
      setCurrentPosition(index);
    }
  };
  
  // Handle keyboard controls
  useEffect(() => {
    if (!gameStarted) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for arrow keys to avoid page scrolling
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
      
      switch (e.key) {
        case "ArrowUp":
          handleMove("up");
          break;
        case "ArrowDown":
          handleMove("down");
          break;
        case "ArrowLeft":
          handleMove("left");
          break;
        case "ArrowRight":
          handleMove("right");
          break;
        case "Enter":
        case " ":
          handleDiscover();
          break;
        case "Escape":
          setExpandedItem(null);
          break;
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted, currentPosition, infoItems, discoveredCount, expandedItem]);
  
  // Calculate grid size for layout
  const gridSize = Math.ceil(Math.sqrt(infoItems.length));
  
  // Get appropriate icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "skills":
        return <BrainIcon className="h-6 w-6" />;
      case "experience":
        return <RocketIcon className="h-6 w-6" />;
      case "education":
        return <LightbulbIcon className="h-6 w-6" />;
      case "hobbies":
        return <StarIcon className="h-6 w-6" />;
      default:
        return <Gamepad2Icon className="h-6 w-6" />;
    }
  };
  
  // Get color for category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "skills":
        return "bg-indigo-500";
      case "experience":
        return "bg-orange-500";
      case "education":
        return "bg-emerald-500";
      case "hobbies":
        return "bg-violet-500";
      default:
        return "bg-blue-500";
    }
  };
  
  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center py-16 px-4 md:px-8 lg:px-10 w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 inline-block transform -rotate-1 border-b-4 border-primary pb-2">
          Discover More About Me
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Play this mini-game to learn about my skills, experience, and more!
        </p>
      </div>
      
      <div className="w-full max-w-5xl">
        {/* Game container */}
        <div className="relative border-[3px] border-black bg-card p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
          <div className="flex justify-between items-center mb-6">
            <Badge className="bg-primary text-primary-foreground font-bold px-4 py-1.5 text-base border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
              {discoveredCount} / {infoItems.length} Discovered
            </Badge>
            
            {!gameStarted ? (
              <Button 
                onClick={handleStartGame}
                className="bg-accent text-lg font-bold border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all"
              >
                <Gamepad2Icon className="mr-2 h-5 w-5" />
                Start Game
              </Button>
            ) : (
              <Badge className="bg-secondary text-secondary-foreground font-bold px-4 py-1.5 text-base border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
                Game Active
              </Badge>
            )}
          </div>
          
          {/* Game grid */}
          <div 
            className="grid gap-4 relative" 
            style={{ 
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            }}
          >
            {/* Overlay for expanded item */}
            {expandedItem !== null && (
              <div className="absolute inset-0 z-10 bg-black/5 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="relative max-w-2xl w-full bg-card border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-3 right-3 border-2 border-black bg-muted hover:bg-muted/80"
                    onClick={() => setExpandedItem(null)}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                  
                  <div className="pb-5 mb-5 border-b-2 border-black flex items-center">
                    <div className={`${getCategoryColor(infoItems[expandedItem].category)} text-white p-3 mr-4 transform -rotate-3 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]`}>
                      {getCategoryIcon(infoItems[expandedItem].category)}
                    </div>
                    <h3 className="text-3xl font-bold">{infoItems[expandedItem].title}</h3>
                  </div>
                  
                  <div className="text-xl space-y-6">
                    <p className="leading-relaxed">{infoItems[expandedItem].content}</p>
                    
                    <div className="flex">
                      <Badge className={`${getCategoryColor(infoItems[expandedItem].category)} text-white font-bold px-4 py-1.5 text-base border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]`}>
                        {infoItems[expandedItem].category.charAt(0).toUpperCase() + infoItems[expandedItem].category.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Grid items */}
            {infoItems.map((item, index) => (
              <div 
                key={item.id}
                onClick={() => handleItemClick(index)}
                className={`
                  aspect-square flex flex-col items-center justify-center border-[3px] border-black p-3 transition-all
                  ${currentPosition === index ? 'bg-secondary scale-105 shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)]' : 'bg-muted shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]'}
                  ${item.discovered ? `${getCategoryColor(item.category)} text-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] cursor-pointer` : ''}
                  ${!item.discovered && gameStarted ? 'hover:bg-secondary/80 cursor-pointer' : ''}
                `}
              >
                {item.discovered ? (
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-white text-black rounded-full p-2 mb-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
                      {getCategoryIcon(item.category)}
                    </div>
                    <span className="font-bold line-clamp-2">{item.title}</span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold">?</span>
                )}
              </div>
            ))}
          </div>
          
          {/* Game controls */}
          <div className="mt-8 grid grid-cols-3 gap-2 max-w-[220px] mx-auto">
            <div></div>
            <Button 
              onClick={() => handleMove("up")} 
              disabled={!gameStarted}
              className="bg-white text-black border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:bg-secondary hover:text-white"
            >
              <ArrowUpIcon className="h-5 w-5" />
            </Button>
            <div></div>
            <Button 
              onClick={() => handleMove("left")} 
              disabled={!gameStarted}
              className="bg-white text-black border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:bg-secondary hover:text-white"
            >
              <ArrowUpIcon className="h-5 w-5 -rotate-90" />
            </Button>
            <Button 
              onClick={handleDiscover} 
              disabled={!gameStarted}
              className="bg-primary text-primary-foreground font-bold border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]"
            >
              Discover
            </Button>
            <Button 
              onClick={() => handleMove("right")} 
              disabled={!gameStarted}
              className="bg-white text-black border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:bg-secondary hover:text-white"
            >
              <ArrowUpIcon className="h-5 w-5 rotate-90" />
            </Button>
            <div></div>
            <Button 
              onClick={() => handleMove("down")} 
              disabled={!gameStarted}
              className="bg-white text-black border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:bg-secondary hover:text-white"
            >
              <ArrowDownIcon className="h-5 w-5" />
            </Button>
            <div></div>
          </div>
          
          {/* Discovered items badges */}
          <div className="mt-10 pt-5 border-t-2 border-black">
            <h4 className="font-bold mb-3 text-lg">Discovered:</h4>
            <div className="flex flex-wrap gap-2">
              {infoItems.filter(item => item.discovered).map(item => (
                <Badge 
                  key={item.id}
                  className={`${getCategoryColor(item.category)} text-white font-bold px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] cursor-pointer transition-all`}
                  onClick={() => handleItemClick(infoItems.findIndex(i => i.id === item.id))}
                >
                  {getCategoryIcon(item.category)}
                  <span className="ml-1.5">{item.title}</span>
                </Badge>
              ))}
              
              {discoveredCount === 0 && (
                <p className="text-muted-foreground italic">Nothing discovered yet!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 