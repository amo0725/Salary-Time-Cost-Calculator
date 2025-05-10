import { createI18nServer } from "next-international/server";
import { DYNAMIC_LOCALES } from "./index"; // Import from our central config

export const {
  getI18n,
  getScopedI18n,
  getStaticParams, // For generating static paths for locales
  getCurrentLocale,
} = createI18nServer(DYNAMIC_LOCALES);
