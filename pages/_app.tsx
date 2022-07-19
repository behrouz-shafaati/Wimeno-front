import React, {useState, useEffect} from 'react'
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import App, { AppProps, AppContext } from 'next/app'
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { appWithTranslation } from 'next-i18next';

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

import createEmotionCache from '../utility/create-emotion-cache';
import lightThemeOptions from '../styles/theme/light-theme-options';
import darkThemeOptions from '../styles/theme/dark-theme-options';

import '../styles/globals.css';
import { useRouter } from 'next/router';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  theme: string;
}

export const ThemeModeContext = React.createContext({ toggleTheme: () => {} })

function getActiveTheme(themeMode: string) {
  return themeMode === 'light' ? lightThemeOptions : darkThemeOptions;
}

// export default function MyApp(props: MyAppProps) {
const MyApp = (props:MyAppProps) => {
  const [selectedTheme, setSelectedTheme] = useState<string>(props.theme);
  const { locale } = useRouter();
  const direction = locale === "fa" ? "rtl" : "ltr";
  lightThemeOptions.direction = direction;
  const activetheme = createTheme(getActiveTheme(selectedTheme));
  const clientSideEmotionCache = createEmotionCache(direction);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const toggleTheme: React.MouseEventHandler<HTMLAnchorElement> = () => {
    const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light';
    setCookie('THEME_MODE', desiredTheme);
    setSelectedTheme(desiredTheme);
  };

  useEffect(() => {
    // setActiveTheme(getActiveTheme(selectedTheme))
  }, [selectedTheme]);


  return (
    <CacheProvider value={emotionCache}>
      <ThemeModeContext.Provider value={toggleTheme}>
        <ThemeProvider theme={activetheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </CacheProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  const req = appContext.ctx.req
  const res = appContext.ctx.res
  const theme = getCookie('THEME_MODE', { req, res }) || 'light';

  return {
    ...appProps,
    theme: theme
  }
}

export default appWithTranslation(MyApp);