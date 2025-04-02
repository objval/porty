"use client";

import { RepeatIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { ColorPicker } from "./color-picker";
import { ModeToggle } from "./mode-toggle";

/**
 * ThemeSelector component that provides a UI for selecting themes and modes
 */
export function ThemeSelector() {
  const { setTheme } = useTheme();

  return (
    <div className="w-full">
      <div className="flex items-start pt-4 md:pt-0">
        <div className="space-y-1 pr-2">
          <div className="font-semibold leading-none tracking-tight">
            Customize
          </div>
          <div className="text-xs text-muted-foreground">
            Pick a style and color for the website.
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto rounded-[0.5rem]"
          onClick={() => setTheme("system")}
          aria-label="Reset to system theme"
        >
          <RepeatIcon />
          <span className="sr-only">Reset</span>
        </Button>
      </div>
      
      <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
        <ColorPicker />
        <ModeToggle />
      </div>
    </div>
  );
} 