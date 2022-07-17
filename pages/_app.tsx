import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { appWithTranslation } from 'next-i18next';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../utility/create-emotion-cache';
import lightThemeOptions from '../styles/theme/light-theme-options';

import '../styles/globals.css';
import { useRouter } from 'next/router';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { locale } = useRouter();
  const clientSideEmotionCache = createEmotionCache(locale);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default appWithTranslation(MyApp);