"use client";

import { useChangeLocale, useCurrentLocale } from "@/i18n/client";
import { locales } from "@/i18n"; // Get the list of all locales

export function LanguageSwitcher() {
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();

  // A more descriptive mapping for display names
  const localeDisplayNames: Record<(typeof locales)[number], string> = {
    en: "English",
    "zh-TW": "繁體中文",
  };

  return (
    <div className="flex items-center space-x-1 md:space-x-2">
      <select
        onChange={(e) =>
          changeLocale(e.target.value as (typeof locales)[number])
        }
        value={currentLocale}
        className="bg-slate-700/80 text-slate-200 p-2 rounded-md border border-slate-600 hover:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors duration-150 text-sm"
        aria-label="Select language"
      >
        {locales.map((loc) => (
          <option
            key={loc}
            value={loc}
            className="bg-slate-800 text-slate-50 font-medium"
          >
            {localeDisplayNames[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}
