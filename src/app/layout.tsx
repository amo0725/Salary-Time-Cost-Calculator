import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProviderClient } from "@/i18n/client";
import { ThemeProvider } from "next-themes";
import { getCurrentLocale } from "@/i18n/server";
import { defaultLocale, type Locale } from "@/i18n"; // Import Locale type

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// export const metadata: Metadata = { // Metadata will be handled in [locale] pages/layouts or dynamically
//   title: "Time Cost Calculator",
//   description: "Calculate the time cost of products based on your salary.",
// };

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale?: Locale }; // Use Locale type for params.locale from URL
}>) {
  // getCurrentLocale() from next-international/server is designed for Server Components.
  // It should tap into the locale set by the middleware.
  const serverGuessedLocale = await getCurrentLocale();

  console.log("[RootLayout] Received from params.locale:", params?.locale);
  console.log(
    "[RootLayout] getCurrentLocale() from next-international:",
    serverGuessedLocale
  );

  // Prioritize params.locale if Next.js provides it correctly for the root layout.
  // Otherwise, use what next-international's server function determined.
  // Fallback to defaultLocale if all else fails (should ideally not happen).
  const effectiveLocale: Locale =
    params?.locale || serverGuessedLocale || defaultLocale;

  if (!params?.locale && !serverGuessedLocale) {
    console.warn(
      "[RootLayout] Warning: Locale could not be determined. Falling back to default ('" +
        defaultLocale +
        "'). Check middleware and routing."
    );
  } else if (params?.locale && params.locale !== serverGuessedLocale) {
    console.warn(
      `[RootLayout] Warning: Mismatch between params.locale ('${params.locale}') and serverGuessedLocale ('${serverGuessedLocale}'). Using params.locale.`
    );
  } else if (!params?.locale && serverGuessedLocale) {
    console.log(
      `[RootLayout] Info: Using locale from getCurrentLocale() ('${serverGuessedLocale}') as params.locale was undefined.`
    );
  }

  return (
    // It's important to set the lang attribute on <html> for accessibility
    <html lang={effectiveLocale} suppressHydrationWarning>
      <head>
        {/* Standard head elements like charset, viewport can go here if not handled by Next.js automatically */}
        {/* For example, Next.js usually handles viewport. If you need specific charsets, add them. */}
        {/* <meta charSet="utf-8" /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProviderClient locale={effectiveLocale}>
            {children}
          </I18nProviderClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
