"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Component for toggling between light and dark mode
 */
export function ModeToggle() {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  
  // Handle client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="space-y-1.5">
        <Label className="text-xs">Mode</Label>
        <div className="grid grid-cols-3 gap-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }

  const isLightMode = resolvedTheme !== "dark";
  const isDarkMode = resolvedTheme === "dark";

  return (
    <div className="space-y-1.5">
      <Label className="text-xs">Mode</Label>
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme("light")}
          className={cn(isLightMode && "border-2 border-primary")}
        >
          <SunIcon className="mr-1 -translate-x-1" />
          Light
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme("dark")}
          className={cn(isDarkMode && "border-2 border-primary dark:border-primary")}
        >
          <MoonIcon className="mr-1 -translate-x-1" />
          Dark
        </Button>
      </div>
    </div>
  );
} 