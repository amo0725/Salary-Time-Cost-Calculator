import { setStaticParamsLocale } from "next-international/server";

export default async function NotFound({
  params,
}: {
  params?: { locale?: string };
}) {
  const currentLocale = params?.locale;

  if (currentLocale) {
    setStaticParamsLocale(currentLocale);
  }

  if (!currentLocale) {
    // This fallback will be used if 'locale' is not available in the params.
    // This might happen if Next.js tries to render this for a generic 404 page
    // during build, or in an unexpected dev server scenario.
    console.warn(
      "[NotFoundPage] Locale parameter was not available. Rendering a generic 404 page."
    );
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        {/* You might want a link to the site root or a sitemap here */}
        <a href="/">Go to Homepage</a>
      </div>
    );
  }

  // If locale is available, render the locale-specific message
  // If you plan to add translations here using getI18n(), ensure it can correctly
  // use `currentLocale` or that the i18n context is properly set up.
  // For now, this uses the locale directly in the message.
  return (
    <div>
      <h1>404 - Page Not Found (Locale: {currentLocale})</h1>
      <p>
        We could not find the page you were looking for in the locale:{" "}
        {currentLocale}.
      </p>
      <a href={`/${currentLocale}`}>Go to {currentLocale} Homepage</a>
    </div>
  );
}
