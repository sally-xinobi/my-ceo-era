"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import EmptyState from "@/components/EmptyState";
import LanguageSwitcher from "@/components/language-switcher";
import { Settings } from "@/components/settings";
import { ToastExample } from "@/components/toast-example";
import Button from "@/components/ui/Button";

export default function Home() {
  const t = useTranslations("home");
  const tTabs = useTranslations("tabs");
  const tSections = useTranslations("sections");
  const [activeTab, setActiveTab] = useState<"overview" | "toast" | "settings">(
    "overview",
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-500">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <header className="flex justify-between items-center mb-16">
          <div>
            <h1 className="text-4xl font-light tracking-tight text-slate-900 dark:text-slate-50">
              Design
              <span className="font-normal text-rose-600 dark:text-rose-400">
                .
              </span>
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 tracking-wide">
              MODERN • TRENDY • ELEGANT
            </p>
          </div>
          <LanguageSwitcher />
        </header>

        <nav className="flex gap-2 mb-12 p-1 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg inline-flex">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`cursor-pointer px-6 py-3 text-sm font-medium transition-all duration-300 rounded-md ${
              activeTab === "overview"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
            }`}
          >
            {tTabs("overview")}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("toast")}
            className={`cursor-pointer px-6 py-3 text-sm font-medium transition-all duration-300 rounded-md ${
              activeTab === "toast"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
            }`}
          >
            {tTabs("toast")}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`cursor-pointer px-6 py-3 text-sm font-medium transition-all duration-300 rounded-md ${
              activeTab === "settings"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
            }`}
          >
            {tTabs("settings")}
          </button>
        </nav>

        {activeTab === "overview" && (
          <div className="space-y-8">
            <section className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-10 shadow-sm border border-slate-200 dark:border-slate-700/50">
              <EmptyState title={t("title")} description={t("description")} />
            </section>

            <section className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700/50 hover:shadow-md transition-shadow duration-300">
                <h2 className="text-lg font-light text-slate-900 dark:text-slate-50 mb-4">
                  {tSections("primaryAction")}
                </h2>
                <div className="flex justify-center">
                  <Button className="w-full max-w-xs">{t("create")}</Button>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700/50 hover:shadow-md transition-shadow duration-300">
                <h2 className="text-lg font-light text-slate-900 dark:text-slate-50 mb-4">
                  {tSections("secondaryAction")}
                </h2>
                <div className="flex justify-center">
                  <Button variant="secondary" className="w-full max-w-xs">
                    {t("create")}
                  </Button>
                </div>
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50">
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  {tSections("feature")}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {tSections("featureDescription")}
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50">
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  {tSections("style")}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {tSections("styleDescription")}
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50">
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  {tSections("design")}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {tSections("designDescription")}
                </p>
              </div>
            </section>
          </div>
        )}

        {activeTab === "toast" && (
          <section className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-10 shadow-sm border border-slate-200 dark:border-slate-700/50">
            <ToastExample />
          </section>
        )}

        {activeTab === "settings" && (
          <section className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-10 shadow-sm border border-slate-200 dark:border-slate-700/50">
            <Settings />
          </section>
        )}

        <footer className="mt-16 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>{t("footer")}</p>
        </footer>
      </div>
    </main>
  );
}
