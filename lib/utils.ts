import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges class names with Tailwind CSS classes
 * 
 * This utility combines the power of clsx and tailwind-merge to provide
 * a convenient way to conditionally apply Tailwind CSS classes without
 * class name conflicts.
 * 
 * @param inputs - List of class values to be merged
 * @returns Merged class string with resolved Tailwind conflicts
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
