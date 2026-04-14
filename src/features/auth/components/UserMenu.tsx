"use client";

import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import { useAuth } from "../hooks/useAuth";

export function UserMenu() {
  const t = useTranslations("auth");
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
          {user.name}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {user.email}
        </p>
      </div>
      <Button variant="secondary" onClick={() => logout()}>
        {t("logout")}
      </Button>
    </div>
  );
}
