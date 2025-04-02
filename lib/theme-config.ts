/**
 * Theme configuration settings and constants
 */

export const THEME_COOKIE_NAME = "active_theme";
export const DEFAULT_THEME = "default";

/**
 * Sets a theme cookie with appropriate security settings
 */
export function setThemeCookie(theme: string): void {
  if (typeof window === "undefined") return;

  document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${
    window.location.protocol === "https:" ? "Secure;" : ""
  }`;
}

/**
 * Applies theme classes to document body
 */
export function applyThemeToBody(theme: string): void {
  // Remove all existing theme classes
  Array.from(document.body.classList)
    .filter((className) => className.startsWith("theme-"))
    .forEach((className) => {
      document.body.classList.remove(className);
    });
    
  // Add new theme classes
  document.body.classList.add(`theme-${theme}`);
  
  // Add scaled class if the theme has scaled variant
  if (theme.endsWith("-scaled")) {
    document.body.classList.add("theme-scaled");
  }
} 