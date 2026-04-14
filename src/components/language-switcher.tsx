"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { routing, usePathname, useRouter } from "@/routing";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("languageSwitcher");

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="flex items-center gap-2">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => handleLocaleChange(loc)}
          disabled={isPending}
          className={`cursor-pointer px-3 py-1 text-sm rounded-md transition-colors ${
            locale === loc
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          {t(loc)}
        </button>
      ))}
    </div>
  );
}
