import { createI18nServer } from "next-international/server";

export const { getI18n, getScopedI18n, getCurrentLocale, getStaticParams } =
  createI18nServer({
    en: () => import("./en"),
    "zh-TW": () => import("./zh-TW"),
    // Add other locales here if needed, e.g.:
    // es: () => import('./es'),
  });

// If you also need to export the Locale type explicitly for some reason:
// Although `getCurrentLocale` returns `Locale` from `next-international`
// and `params: { locale: Locale }` in layout usually gets it from there.
// export type Locale = Parameters<typeof getCurrentLocale>[0]; // This might be redundant
