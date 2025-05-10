export const locales = ["en", "zh-TW"] as const;
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];

// Define a loader for your locales
export const DYNAMIC_LOCALES = {
  en: () => import("@/locales/en"),
  "zh-TW": () => import("@/locales/zh-TW"),
} as const;

// Helper to get the type of a specific locale module
export type LocaleMessages = typeof import("@/locales/en").default;
