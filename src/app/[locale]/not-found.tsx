import Link from "next/link";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-bold">{t("title")}</h1>
        <h2 className="mt-4 text-2xl font-semibold">{t("heading")}</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {t("description")}
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button>{t("backHome")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
