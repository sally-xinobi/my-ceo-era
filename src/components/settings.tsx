"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useAppStore } from "@/stores/appStore";

interface SettingsProps {
  onNextThemeChange?: (theme: "light" | "dark" | "system" | null) => void;
}

export function Settings({ onNextThemeChange }: SettingsProps) {
  const t = useTranslations("settings");
  const { theme, setTheme } = useAppStore();
  const { setTheme: setNextTheme } = useTheme();

  const themes = [
    {
      value: "light" as const,
      label: t("light"),
      description: t("lightDescription"),
    },
    {
      value: "dark" as const,
      label: t("dark"),
      description: t("darkDescription"),
    },
    {
      value: "system" as const,
      label: t("system"),
      description: t("systemDescription"),
    },
  ];

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    setNextTheme(newTheme);
    if (onNextThemeChange) {
      onNextThemeChange(newTheme);
    }
  };

  // console.log("[Settings] Current theme:", theme);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-light text-slate-900 dark:text-slate-50 mb-6">
          {t("themePreference")}
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {themes.map((themeOption) => (
            <button
              key={themeOption.value}
              type="button"
              onClick={() => handleThemeChange(themeOption.value)}
              className={`cursor-pointer relative p-6 rounded-xl border transition-all duration-300 ${
                theme === themeOption.value
                  ? "bg-white dark:bg-slate-700 border-rose-200 dark:border-rose-400 shadow-sm"
                  : "bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 border-slate-200 dark:border-slate-700/50 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              {theme === themeOption.value && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 dark:bg-rose-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
              <div className="text-center">
                <div className="text-sm font-medium text-slate-900 dark:text-slate-50 mb-1">
                  {themeOption.label}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {themeOption.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
