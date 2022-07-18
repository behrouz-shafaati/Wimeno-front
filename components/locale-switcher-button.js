import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BgIconButton from './bg-icon-button'
import { Box, Typography } from "@mui/material";

export default function LocaleSwitcher(props) {
  const router = useRouter();

  const { locales, locale: activeLocale } = router;

  const otherLocales = locales?.filter(
    (locale) => locale !== activeLocale && locale !== "default"
  );

  const setCookie = (locale) => {
    document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`
  }

  React.useEffect(() => {
    let dir = router.locale == "fa" ? "rtl" : "ltr";
    document.querySelector("html").setAttribute("dir", dir);
  }, [activeLocale]);

  return (
    <Box {...props}>
      {otherLocales?.map((locale) => {
        const { pathname, query, asPath } = router;
        return (
          <span key={"locale-" + locale}>
            <Link href={{ pathname, query }} as={asPath} locale={locale}>
              <a>
                <BgIconButton
                  onClick={() => {
                    const locale = router.locale === 'en' ? 'fa' : 'en'
                    setCookie(locale)
                    router.push(router.asPath, undefined, { locale })
                }}
                  sx={{width: 40, height: 40}}
                >
                  <Typography sx={{textShadow: '0 4px 4px rgb(0,0,0,0.25)'}}>
                    {locale}
                  </Typography>
                </BgIconButton>
              </a>
            </Link>
          </span>
        );
      })}
    </Box>
  );
}