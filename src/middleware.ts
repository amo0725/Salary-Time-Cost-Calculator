import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/i18n";

export default async function middleware(request: NextRequest) {
  console.log(`[Middleware] Triggered for path: ${request.nextUrl.pathname}`);

  try {
    const i18nMiddleware = createI18nMiddleware({
      locales,
      defaultLocale,
      // headerName: 'X-Next-Locale', // Default header, usually not needed to change
      // Ensure prefixDefaultLocale is true (usually default)
      // prefixDefaultLocale: true
    });
    const response = i18nMiddleware(request);

    console.log(
      `[Middleware] Response URL: ${response.url}, Status: ${response.status}`
    );
    return response;
  } catch (error) {
    console.error("[Middleware] Error:", error);
    // Fallback response if middleware itself errors
    return NextResponse.next(); // Or a custom error page / redirect
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|worker.js).*)",
  ], // Restored and slightly expanded
  // matcher: ["/:path*"], // Simplified for testing - REMOVE THIS
};
