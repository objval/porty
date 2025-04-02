"use client";

import { useEffect, useRef } from "react";

interface Shape {
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  type: "square" | "circle" | "triangle";
  speedX: number;
  speedY: number;
  rotationSpeed: number;
}

/**
 * Background animation component with floating shapes
 * that responds to user scroll position
 */
export function BackgroundAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<Shape[]>([]);
  const rafRef = useRef<number>(0);
  
  // Initialize shapes
  useEffect(() => {
    const colors = [
      "#FF8A80", // Coral red
      "#FFD54F", // Amber
      "#81D4FA", // Light blue
      "#A5D6A7", // Light green
      "#CE93D8", // Light purple
    ];
    
    const types: Shape["type"][] = ["square", "circle", "triangle"];
    const shapes: Shape[] = [];
    
    // Create 15 random shapes
    for (let i = 0; i < 15; i++) {
      shapes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 30 + Math.random() * 70,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        type: types[Math.floor(Math.random() * types.length)],
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
      });
    }
    
    shapesRef.current = shapes;
    
    // Start animation
    startAnimation();
    
    return () => {
      // Clean up animation on unmount
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);
  
  // Add scroll listener to affect shape movement
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Update shape positions based on scroll
      shapesRef.current.forEach(shape => {
        shape.y += scrollY * 0.01 * (shape.speedY > 0 ? 1 : -1);
        shape.rotation += scrollY * 0.01 * (shape.rotationSpeed > 0 ? 1 : -1);
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Animation function
  const startAnimation = () => {
    const animate = () => {
      const container = containerRef.current;
      if (!container) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Clear the container
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      
      // Draw each shape
      shapesRef.current.forEach(shape => {
        // Update position
        shape.x += shape.speedX;
        shape.y += shape.speedY;
        shape.rotation += shape.rotationSpeed;
        
        // Wrap around screen
        if (shape.x < -shape.size) shape.x = window.innerWidth + shape.size;
        if (shape.x > window.innerWidth + shape.size) shape.x = -shape.size;
        if (shape.y < -shape.size) shape.y = window.innerHeight + shape.size;
        if (shape.y > window.innerHeight + shape.size) shape.y = -shape.size;
        
        // Create shape element
        const element = document.createElement("div");
        element.className = "absolute";
        element.style.left = `${shape.x}px`;
        element.style.top = `${shape.y}px`;
        element.style.width = `${shape.size}px`;
        element.style.height = `${shape.size}px`;
        element.style.backgroundColor = shape.color;
        element.style.transform = `rotate(${shape.rotation}deg)`;
        element.style.boxShadow = "5px 5px 0 rgba(0, 0, 0, 0.8)";
        
        // Apply shape-specific styles
        if (shape.type === "square") {
          element.style.borderRadius = "0";
          element.style.border = "3px solid black";
        } else if (shape.type === "circle") {
          element.style.borderRadius = "50%";
          element.style.border = "3px solid black";
        } else if (shape.type === "triangle") {
          element.style.width = "0";
          element.style.height = "0";
          element.style.backgroundColor = "transparent";
          element.style.borderLeft = `${shape.size / 2}px solid transparent`;
          element.style.borderRight = `${shape.size / 2}px solid transparent`;
          element.style.borderBottom = `${shape.size}px solid ${shape.color}`;
          element.style.boxShadow = "none";
          
          // Add another div for the border (triangles are tricky)
          const border = document.createElement("div");
          border.className = "absolute -top-1 -left-1";
          border.style.width = "0";
          border.style.height = "0";
          border.style.borderLeft = `${shape.size / 2 + 3}px solid transparent`;
          border.style.borderRight = `${shape.size / 2 + 3}px solid transparent`;
          border.style.borderBottom = `${shape.size + 3}px solid black`;
          border.style.zIndex = "-1";
          element.appendChild(border);
        }
        
        container.appendChild(element);
      });
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
  };
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    />
  );
} 