import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProviderClient } from "@/i18n/client";
import { ThemeProvider } from "next-themes";
import { getCurrentLocale } from "@/i18n/server";
import { defaultLocale, type Locale } from "@/i18n"; // Import Locale type and 'locales'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  // This is tricky for a root layout without a [locale] param.
  // What we want is for Next.js to understand that "/" should try to render with a locale.
  // This might not be the right place. The error on "/" suggests it *tries* to render
  // and then `getCurrentLocale` fails.

  // Let's focus on the try-catch for getCurrentLocale first.
  // return [{ /* no locale param here */ }]; // This doesn't make sense for RootLayout.
  return []; // Or simply omit generateStaticParams if not for a dynamic segment.
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { locale?: Locale }; // Use Locale type for params.locale from URL
}>) {
  let determinedLocale: Locale | undefined = undefined;

  try {
    // For RootLayout, params.locale will be undefined.
    // We rely solely on getCurrentLocale which should be set by middleware.
    determinedLocale = await getCurrentLocale();
    console.log(
      "[RootLayout] getCurrentLocale() from next-international:",
      determinedLocale
    );
  } catch (error) {
    console.error(
      "[RootLayout] Error calling getCurrentLocale():",
      error,
      "Falling back to defaultLocale."
    );
    // If getCurrentLocale throws, we catch it and use defaultLocale.
  }

  const effectiveLocale: Locale = determinedLocale || defaultLocale;

  // Log the decision
  if (!determinedLocale) {
    console.warn(
      `[RootLayout] Warning: Locale could not be determined via getCurrentLocale(). Falling back to default ('${defaultLocale}'). Check middleware and routing for paths like '/' or '/_not-found'.`
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
