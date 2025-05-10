import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n";

export default function GlobalNotFound() {
  // Redirect to the default locale's not-found page
  redirect(`/${defaultLocale}`);
}
