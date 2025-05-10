import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // Removed as fontSans is no longer used
import dynamic from "next/dynamic";
import { getStaticParams } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";
import "@/app/globals.css";

// const fontSans = Inter({ // Removed as it's unused
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

const DynamicWrappedProviders = dynamic(
  () => import("@/components/WrappedProviders"),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Time Cost Calculator - Debugging",
  description: "Calculate the time cost of products based on your salary.",
};

export async function generateStaticParams() {
  const localeParams = getStaticParams(); // This returns [{ locale: 'en' }, ...]
  // Ensure localeParams is an array before mapping
  if (!Array.isArray(localeParams)) {
    console.warn(
      "[LocaleLayout] getStaticParams did not return an array. Check your i18n setup."
    );
    return []; // Return empty or handle error appropriately
  }
  return localeParams.map((params) => {
    // It's possible params might not have a 'locale' property directly,
    // or it might be nested. Adjust if necessary based on what getStaticParams returns.
    // Assuming params is like { locale: 'en' }
    if (params && typeof params.locale === "string") {
      setStaticParamsLocale(params.locale);
    } else {
      // Log a warning if the structure is not as expected
      console.warn(
        "[LocaleLayout] generateStaticParams: locale param is missing or not a string",
        params
      );
    }
    return params;
  });
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // According to next-international docs, for pages/layouts under [locale],
  // you might also need to call setStaticParamsLocale at the beginning of the component too,
  // if using Next.js < 15 or if params is not a promise.
  // For Next.js 14 with an async component, params.locale should be directly available.
  // The primary place for build-time is generateStaticParams.
  // If issues persist, uncommenting this might be needed:
  setStaticParamsLocale(locale);

  return (
    <DynamicWrappedProviders locale={locale}>
      {children}
    </DynamicWrappedProviders>
  );
}
