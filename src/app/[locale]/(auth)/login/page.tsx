import { useTranslations } from "next-intl";
import { LoginForm } from "@/features/auth";
import { Link } from "@/routing";

export default function LoginPage() {
  const t = useTranslations("auth");

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-light text-slate-900 dark:text-slate-50">
          {t("loginTitle")}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {t("loginDescription")}
        </p>
      </div>
      <LoginForm />
      <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
        {t("noAccount")}{" "}
        <Link
          href="/signup"
          className="text-rose-600 dark:text-rose-400 hover:underline"
        >
          {t("signup")}
        </Link>
      </p>
    </>
  );
}
