"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "@/routing";
import { useAuth } from "../hooks/useAuth";
import { type SignupFormData, useSignupForm } from "../hooks/useAuthForm";

export function SignupForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const { signup, error: authError, clearError } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useSignupForm();

  const onSubmit = async (data: SignupFormData) => {
    setSubmitError(null);
    clearError();
    try {
      await signup({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      router.push("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : t("signupFailed");
      setSubmitError(message);
    }
  };

  const displayError = submitError || authError;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label={t("name")}
        type="text"
        placeholder={t("namePlaceholder")}
        error={errors.name?.message}
        {...register("name")}
      />
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
      <Input
        label={t("confirmPassword")}
        type="password"
        placeholder={t("confirmPasswordPlaceholder")}
        error={errors.passwordConfirm?.message}
        {...register("passwordConfirm")}
      />
      {displayError && <p className="text-sm text-red-500">{displayError}</p>}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? t("signingUp") : t("signup")}
      </Button>
    </form>
  );
}
