"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { DEFAULT_THEME, applyThemeToBody, setThemeCookie } from "./theme-config";

/**
 * Theme context type definition
 */
export interface ThemeContextType {
  /** Current active theme */
  activeTheme: string;
  /** Function to update the active theme */
  setActiveTheme: (theme: string) => void;
}

/**
 * Context for theme state management
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Provider component that makes theme available throughout the app
 */
export function ThemeContextProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme?: string;
}) {
  const [activeTheme, setActiveTheme] = useState<string>(
    () => initialTheme || DEFAULT_THEME
  );

  useEffect(() => {
    // Apply theme to cookie and DOM
    setThemeCookie(activeTheme);
    applyThemeToBody(activeTheme);
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook for accessing theme context
 * @throws Error if used outside ThemeContextProvider
 */
export function useThemeContext() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider");
  }
  
  return context;
} 