"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import Button from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          {error.message || t("description")}
        </p>
        {error.digest && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            Error ID: {error.digest}
          </p>
        )}
        <div className="mt-8 flex justify-center gap-4">
          <Button onClick={() => reset()}>{t("reset")}</Button>
          <Button variant="secondary" onClick={handleGoHome}>
            {t("backHome")}
          </Button>
        </div>
      </div>
    </div>
  );
}
