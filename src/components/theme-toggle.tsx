"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const themes = ["light", "dark", "system"] as const;
  const currentIndex = themes.indexOf(theme as (typeof themes)[number]);
  const nextTheme = themes[(currentIndex + 1) % themes.length];

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 opacity-0",
          className,
        )}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className={cn(
        "absolute top-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full",
        "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md",
        "border border-neutral-200 dark:border-neutral-800",
        "text-neutral-800 dark:text-neutral-100",
        "shadow-sm hover:shadow-md dark:shadow-neutral-950/50",
        "cursor-pointer outline-none",
        "hover:bg-neutral-50 dark:hover:bg-neutral-800/80",
        "active:scale-95 active:bg-neutral-100 dark:active:bg-neutral-800",
        "focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-400 dark:focus-visible:ring-offset-neutral-900",
        "transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
        className,
      )}
      aria-label={`Current theme: ${theme}. Click to cycle themes.`}
      title={`Current theme: ${theme}. Click to cycle to ${nextTheme}.`}
    >
      <Sun
        className={cn(
          "h-[1.2rem] w-[1.2rem] absolute transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
          theme === "light" ? "rotate-0 scale-100" : "-rotate-90 scale-0",
        )}
        strokeWidth={2}
      />
      <Moon
        className={cn(
          "h-[1.2rem] w-[1.2rem] absolute transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
          theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0",
        )}
        strokeWidth={2}
      />
      <Monitor
        className={cn(
          "h-[1.2rem] w-[1.2rem] absolute transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
          theme === "system" ? "rotate-0 scale-100" : "rotate-90 scale-0",
        )}
        strokeWidth={2}
      />
      <span className="sr-only">Toggle theme: {theme}</span>
    </button>
  );
}
