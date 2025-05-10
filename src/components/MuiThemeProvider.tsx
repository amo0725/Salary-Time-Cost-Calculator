"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getDesignTokens } from "@/lib/muiTheme";

export function MuiThemeProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Effectively blunt FOUC
  // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#avoid-hydration-mismatch
  React.useEffect(() => setMounted(true), []);

  const muiTheme = React.useMemo(() => {
    const mode = resolvedTheme === "dark" ? "dark" : "light";
    return createTheme(getDesignTokens(mode));
  }, [resolvedTheme]);

  if (!mounted) {
    // Return null or a loading skeleton to avoid FOUC / hydration mismatch
    return null;
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      {/* CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
