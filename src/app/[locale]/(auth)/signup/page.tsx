import { useTranslations } from "next-intl";
import { SignupForm } from "@/features/auth";
import { Link } from "@/routing";

export default function SignupPage() {
  const t = useTranslations("auth");

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-light text-slate-900 dark:text-slate-50">
          {t("signupTitle")}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {t("signupDescription")}
        </p>
      </div>
      <SignupForm />
      <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
        {t("hasAccount")}{" "}
        <Link
          href="/login"
          className="text-rose-600 dark:text-rose-400 hover:underline"
        >
          {t("login")}
        </Link>
      </p>
    </>
  );
}
