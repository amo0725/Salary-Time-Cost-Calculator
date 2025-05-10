// src/app/page.tsx
import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n";

export default function RootPage() {
  const targetPath = `/${defaultLocale}`;
  redirect(targetPath);
  // No explicit return needed as redirect() throws an error that Next.js handles.
}
