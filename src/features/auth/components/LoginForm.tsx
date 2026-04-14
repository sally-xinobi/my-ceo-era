"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "@/routing";
import { useAuth } from "../hooks/useAuth";
import { type LoginFormData, useLoginForm } from "../hooks/useAuthForm";

export function LoginForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const { login, error: authError, clearError } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useLoginForm();

  const onSubmit = async (data: LoginFormData) => {
    setSubmitError(null);
    clearError();
    try {
      await login(data);
      router.push("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : t("loginFailed");
      setSubmitError(message);
    }
  };

  const displayError = submitError || authError;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label={t("email")}
        type="email"
        placeholder={t("emailPlaceholder")}
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label={t("password")}
        type="password"
        placeholder={t("passwordPlaceholder")}
        error={errors.password?.message}
        {...register("password")}
      />
      {displayError && <p className="text-sm text-red-500">{displayError}</p>}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? t("loggingIn") : t("login")}
      </Button>
    </form>
  );
}
