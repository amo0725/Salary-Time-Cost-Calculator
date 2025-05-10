export type SalaryType = "hourly" | "monthly" | "yearly";
export type Currency =
  | "USD"
  | "TWD"
  | "EUR"
  | "JPY"
  | "GBP"
  | "AUD"
  | "CAD"
  | "CHF"
  | "CNY"
  | "HKD"
  | "SGD"
  | "KRW"
  | "INR"
  | "BRL"
  | "RUB"
  | "ZAR"
  | "NZD"
  | "MXN";

export interface Salary {
  amount: number;
  type: SalaryType;
  currency: Currency;
}

export interface Product {
  price: number;
  currency: Currency; // For now, assume product currency is same as salary or needs conversion
}

export interface TimeCost {
  years: number;
  months: number;
  days: number;
  hours: number;
  totalHours: number;
}
