import { Salary, TimeCost, Product, Currency } from "./types";

const HOURS_PER_DAY = 8;
const DAYS_PER_MONTH = 20; // Assuming 4 weeks * 5 workdays/week
const MONTHS_PER_YEAR = 12;

// --- START CACHE DEFINITION ---
interface RateCacheEntry {
  rates: { [key: string]: number }; // e.g., { USD: 1, EUR: 0.9, TWD: 30 }
  nextUpdateTime: number; // Unix timestamp (seconds)
}

const exchangeRateCache: { [baseCurrency: string]: RateCacheEntry } = {};
// --- END CACHE DEFINITION ---

export function calculateHourlyRate(salary: Salary): number {
  if (salary.amount <= 0) return 0;

  switch (salary.type) {
    case "yearly":
      return salary.amount / (MONTHS_PER_YEAR * DAYS_PER_MONTH * HOURS_PER_DAY);
    case "monthly":
      return salary.amount / (DAYS_PER_MONTH * HOURS_PER_DAY);
    case "hourly":
      return salary.amount;
    default:
      // Should not happen with TypeScript, but good for safety
      throw new Error("Invalid salary type");
  }
}

/**
 * Converts product price to salary currency using ExchangeRate-API with caching.
 * Fallbacks to no conversion if API fails or rates are unavailable.
 * IMPORTANT: This API requires attribution. See https://www.exchangerate-api.com/docs/free
 * TODO: For production, consider moving API calls to a backend route.
 */
async function convertPriceToSalaryCurrency(
  productPrice: number,
  productCurrency: Currency,
  salaryCurrency: Currency
): Promise<{ price: number; rate: number | null }> {
  if (productCurrency === salaryCurrency) {
    return { price: productPrice, rate: 1 };
  }

  const nowInSeconds = Date.now() / 1000;
  const cachedEntry = exchangeRateCache[productCurrency];

  if (cachedEntry && nowInSeconds < cachedEntry.nextUpdateTime) {
    const cachedRate = cachedEntry.rates[salaryCurrency];
    if (cachedRate) {
      // console.log(`Using cached rate for ${productCurrency} to ${salaryCurrency}`);
      return { price: productPrice * cachedRate, rate: cachedRate };
    }
    // If specific target currency not in cached rates (should not happen if API response was complete)
    // Fall through to fetch, though this case is unlikely with a full rates object from API.
  }

  const apiUrl = `https://open.er-api.com/v6/latest/${productCurrency}`;

  try {
    // console.log(`Fetching live rates for ${productCurrency}`);
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(
        `Error fetching exchange rates: ${response.status} ${response.statusText}`
      );
      return { price: productPrice, rate: null };
    }

    const data = await response.json(); // Assuming API returns an object like { result: string, rates: object, time_next_update_unix: number }

    if (data.result === "success" && data.rates && data.time_next_update_unix) {
      // Update cache
      exchangeRateCache[productCurrency] = {
        rates: data.rates,
        nextUpdateTime: data.time_next_update_unix,
      };
      // console.log(`Cached new rates for ${productCurrency}, next update: ${new Date(data.time_next_update_unix * 1000)}`);

      const rate = data.rates[salaryCurrency];
      if (rate) {
        return { price: productPrice * rate, rate: rate };
      } else {
        console.warn(
          `Rate for ${salaryCurrency} not found in API response for base ${productCurrency}.`
        );
        return { price: productPrice, rate: null }; // Target currency rate not in API response
      }
    } else {
      console.warn(
        `Could not fetch valid rate data from API for ${productCurrency}. Response:`,
        data
      );
      return { price: productPrice, rate: null }; // API did not return success or necessary data
    }
  } catch (error) {
    console.error("Error during currency conversion API call:", error);
    return { price: productPrice, rate: null };
  }
}

export async function calculateTimeCost(
  salary: Salary,
  product: Product
): Promise<{
  timeCostData: TimeCost;
  exchangeRateInfo: {
    productCurrency: Currency;
    salaryCurrency: Currency;
    rateApplied: number | null;
  };
} | null> {
  if (product.price < 0) return null;
  if (salary.amount <= 0) return null;

  const conversionResult = await convertPriceToSalaryCurrency(
    product.price,
    product.currency,
    salary.currency
  );

  const productPriceInSalaryCurrency = conversionResult.price;
  const exchangeRateApplied = conversionResult.rate;

  const hourlyRate = calculateHourlyRate(salary);
  if (hourlyRate === 0) return null;

  const totalHours = productPriceInSalaryCurrency / hourlyRate;

  if (totalHours === Infinity || isNaN(totalHours)) return null;

  let remainingHours = totalHours;

  const years = Math.floor(
    remainingHours / (MONTHS_PER_YEAR * DAYS_PER_MONTH * HOURS_PER_DAY)
  );
  remainingHours %= MONTHS_PER_YEAR * DAYS_PER_MONTH * HOURS_PER_DAY;

  const months = Math.floor(remainingHours / (DAYS_PER_MONTH * HOURS_PER_DAY));
  remainingHours %= DAYS_PER_MONTH * HOURS_PER_DAY;

  const days = Math.floor(remainingHours / HOURS_PER_DAY);
  remainingHours %= HOURS_PER_DAY;

  const hours = parseFloat(remainingHours.toFixed(1));

  const timeCostData: TimeCost = {
    years,
    months,
    days,
    hours,
    totalHours: parseFloat(totalHours.toFixed(1)),
  };

  return {
    timeCostData,
    exchangeRateInfo: {
      productCurrency: product.currency,
      salaryCurrency: salary.currency,
      rateApplied: exchangeRateApplied,
    },
  };
}
