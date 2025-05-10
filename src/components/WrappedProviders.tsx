"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { I18nProviderClient } from "@/i18n/client";
import { MuiThemeProviderClient } from "@/components/MuiThemeProvider";

interface WrappedProvidersProps {
  children: ReactNode;
  locale: string;
}

export default function WrappedProviders({
  children,
  locale,
}: WrappedProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <I18nProviderClient locale={locale}>
        <MuiThemeProviderClient>
          <div id="debug-root-layout-wrapper">{children}</div>
        </MuiThemeProviderClient>
      </I18nProviderClient>
    </ThemeProvider>
  );
}
