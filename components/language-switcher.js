import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LocaleSwitcher() {
  const router = useRouter();

  const { locales, locale: activeLocale } = router;

  const otherLocales = locales?.filter(
    (locale) => locale !== activeLocale && locale !== "default"
  );

  React.useEffect(() => {
    let dir = router.locale == "fa" ? "rtl" : "ltr";
    document.querySelector("html").setAttribute("dir", dir);
  }, [activeLocale]);

  return (
    <span className="text-muted cursor-pointer">
      {otherLocales?.map((locale) => {
        const { pathname, query, asPath } = router;
        return (
          <span key={"locale-" + locale}>
            <Link href={{ pathname, query }} as={asPath} locale={locale}>
              <a>
                {locale === "en" ? "English" : locale === "fa" ? "فارسی" : null}
              </a>
            </Link>
          </span>
        );
      })}
    </span>
  );
}