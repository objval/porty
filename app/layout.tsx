import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";

import "./globals.css";
import "./themes.css";

import { ThemeContextProvider } from "@/lib/theme-context";
import { THEME_COOKIE_NAME } from "@/lib/theme-config";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Theme Selector Demo",
  description: "A demo of theme selection capabilities in Next.js",
};

/**
 * Root layout component that sets up fonts, themes, and global context
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get(THEME_COOKIE_NAME)?.value;
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased",
          activeThemeValue ? `theme-${activeThemeValue}` : "",
        )}
      >
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <ThemeContextProvider initialTheme={activeThemeValue}>
            {children}
          </ThemeContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
