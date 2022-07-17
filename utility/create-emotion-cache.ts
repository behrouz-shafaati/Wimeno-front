import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

const createEmotionCache = (locale: string) => {
  const direction = locale === "fa" ? "rtl" : "ltr";
  console.log("direction:",direction)
  const stylisPlugins = direction =="ltr" ? [prefixer] : [prefixer, rtlPlugin];
  return createCache({ key: `mui${direction}`, prepend: true, stylisPlugins: stylisPlugins, });
};

export default createEmotionCache;