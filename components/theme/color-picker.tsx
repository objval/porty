"use client";

import { CheckIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect, CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { baseColors } from "@/lib/colors";
import { cn } from "@/lib/utils";
import { useThemeContext } from "@/lib/theme-context";

/**
 * Color picker component for selecting theme colors
 */
export function ColorPicker() {
  const { activeTheme, setActiveTheme } = useThemeContext();
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  
  // Handle client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="space-y-1.5">
        <Label className="text-xs">Color</Label>
        <div className="flex flex-col gap-2">
          {baseColors.map((color) => (
            <Skeleton className="h-8 w-full" key={color.name} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <Label className="text-xs">Color</Label>
      <div className="flex flex-col gap-2">
        {baseColors.map((color) => {
          const isActive = activeTheme === color.name;
          const colorMode = resolvedTheme === "dark" ? "dark" : "light";
          const primaryColor = color.activeColor[colorMode];

          return (
            <Button
              variant="outline"
              size="sm"
              key={color.name}
              onClick={() => setActiveTheme(color.name)}
              className={cn(
                "justify-start",
                isActive && "border-2 border-primary dark:border-primary"
              )}
              style={
                {
                  "--theme-primary": primaryColor,
                } as CSSProperties
              }
            >
              <span
                className={cn(
                  "mr-1 flex size-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[var(--theme-primary)]"
                )}
              >
                {isActive && <CheckIcon className="size-4 text-white" />}
              </span>
              {color.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
} 