"use client"; // This whole file is for client-side

import { createI18nClient } from "next-international/client";
import { DYNAMIC_LOCALES } from "./index"; // Import from our central config

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useChangeLocale,
  useCurrentLocale,
} = createI18nClient(DYNAMIC_LOCALES);
