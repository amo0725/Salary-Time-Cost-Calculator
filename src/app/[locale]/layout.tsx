import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // Removed as fontSans is no longer used
import dynamic from "next/dynamic";
import { getStaticParams } from "@/locales/server";
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

export function generateStaticParams() {
  return getStaticParams();
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <DynamicWrappedProviders locale={locale}>
      {children}
    </DynamicWrappedProviders>
  );
}
