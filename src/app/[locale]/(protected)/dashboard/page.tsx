"use client";

import { useTranslations } from "next-intl";
import { UserMenu } from "@/features/auth";

export default function DashboardPage() {
  const t = useTranslations("auth");

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-500">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-light text-slate-900 dark:text-slate-50">
            {t("dashboard")}
          </h1>
          <UserMenu />
        </header>
        <section className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-10 shadow-sm border border-slate-200 dark:border-slate-700/50">
          <p className="text-slate-600 dark:text-slate-300">
            {t("dashboardWelcome")}
          </p>
        </section>
      </div>
    </main>
  );
}
