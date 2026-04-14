import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800/50 backdrop-blur-sm p-8 shadow-sm border border-slate-200 dark:border-slate-700/50">
        {children}
      </div>
    </div>
  );
}
