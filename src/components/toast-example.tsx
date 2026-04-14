"use client";

import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import {
  showErrorToast,
  showInfoToast,
  showLoadingToast,
  showSuccessToast,
  showWarningToast,
} from "@/lib/toast";

export function ToastExample() {
  const t = useTranslations("toast");
  const handleSuccess = () => {
    showSuccessToast("Success message example");
  };

  const handleError = () => {
    showErrorToast("Error message example");
  };

  const handleInfo = () => {
    showInfoToast("Info message example");
  };

  const handleWarning = () => {
    showWarningToast("Warning message example");
  };

  const handleLoading = () => {
    showLoadingToast("Loading...");
    setTimeout(() => {
      showSuccessToast("Operation completed!");
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-4 p-6 border rounded-lg">
      <h2 className="text-xl font-semibold">{t("title")}</h2>
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSuccess}>{t("success")}</Button>
        <Button variant="secondary" onClick={handleError}>
          {t("error")}
        </Button>
        <Button variant="secondary" onClick={handleInfo}>
          {t("info")}
        </Button>
        <Button variant="secondary" onClick={handleWarning}>
          {t("warning")}
        </Button>
        <Button variant="secondary" onClick={handleLoading}>
          {t("loading")}
        </Button>
      </div>
    </div>
  );
}
