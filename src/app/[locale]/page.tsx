"use client";

import { useState, useId } from "react";
import { calculateTimeCost } from "@/lib/calculator";
import { Salary, SalaryType, TimeCost, Product, Currency } from "@/lib/types";
import { useI18n, useCurrentLocale } from "@/i18n/client";
import { ResultModal } from "@/components/ResultModal";
import {
  CurrencySelectMUI,
  type CurrencyOption,
} from "@/components/CurrencySelectMUI";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function HomePage() {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const salaryFieldId = useId();
  const productFieldId = useId();
  const salaryLabelId = `label-for-${salaryFieldId}`;
  const productLabelId = `label-for-${productFieldId}`;

  const [salaryAmount, setSalaryAmount] = useState<string>("");
  const [salaryType, setSalaryType] = useState<SalaryType>("monthly");
  const [salaryCurrency, setSalaryCurrency] = useState<CurrencyOption>({
    value: "TWD",
    label: "🇹🇼 TWD",
  });
  const [productPrice, setProductPrice] = useState<string>("");
  const [productCurrency, setProductCurrency] = useState<CurrencyOption>({
    value: "TWD",
    label: "🇹🇼 TWD",
  });

  const [calculationResult, setCalculationResult] = useState<{
    timeCostData: TimeCost;
    exchangeRateInfo: {
      productCurrency: Currency;
      salaryCurrency: Currency;
      rateApplied: number | null;
    };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCalculationResult(null);
    setIsLoading(true);

    try {
      const parsedSalaryAmount = parseFloat(salaryAmount);
      const parsedProductPrice = parseFloat(productPrice);

      if (isNaN(parsedSalaryAmount) || parsedSalaryAmount <= 0) {
        setError(t("errorInvalidSalary"));
        setIsLoading(false);
        setCalculationResult(null);
        return;
      }
      if (isNaN(parsedProductPrice) || parsedProductPrice < 0) {
        setError(t("errorInvalidPrice"));
        setIsLoading(false);
        setCalculationResult(null);
        return;
      }

      const salary: Salary = {
        amount: parsedSalaryAmount,
        type: salaryType,
        currency: salaryCurrency.value,
      };

      const product: Product = {
        price: parsedProductPrice,
        currency: productCurrency.value,
      };

      const result = await calculateTimeCost(salary, product);
      if (result) {
        setCalculationResult(result);
        setIsModalOpen(true);
      } else {
        setError(t("errorCalculation"));
        setCalculationResult(null);
      }
    } catch (calcError) {
      setError(t("errorCalculation"));
      setCalculationResult(null);
      console.error("Calculation error:", calcError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const salaryTypeOptions: { value: SalaryType; label: string }[] = [
    { value: "hourly", label: t("salaryTypeHourly") },
    { value: "monthly", label: t("salaryTypeMonthly") },
    { value: "yearly", label: t("salaryTypeYearly") },
  ];

  const currencyOptions: CurrencyOption[] = [
    { value: "USD", label: "🇺🇸 USD" },
    { value: "TWD", label: "🇹🇼 TWD" },
    { value: "EUR", label: "🇪🇺 EUR" },
    { value: "JPY", label: "🇯🇵 JPY" },
    { value: "GBP", label: "🇬🇧 GBP" },
    { value: "AUD", label: "🇦🇺 AUD" },
    { value: "CAD", label: "🇨🇦 CAD" },
    { value: "CHF", label: "🇨🇭 CHF" },
    { value: "CNY", label: "🇨🇳 CNY" },
    { value: "HKD", label: "🇭🇰 HKD" },
    { value: "SGD", label: "🇸🇬 SGD" },
    { value: "KRW", label: "🇰🇷 KRW" },
    { value: "INR", label: "🇮🇳 INR" },
    { value: "BRL", label: "🇧🇷 BRL" },
    { value: "RUB", label: "🇷🇺 RUB" },
    { value: "ZAR", label: "🇿🇦 ZAR" },
    { value: "NZD", label: "🇳🇿 NZD" },
    { value: "MXN", label: "🇲🇽 MXN" },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg bg-white dark:bg-slate-800/60 dark:backdrop-blur-md shadow-2xl rounded-xl p-6 md:p-8 ring-1 ring-slate-900/5 dark:ring-slate-100/5">
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 2 }}
        >
          <LanguageSwitcher />
          <ThemeSwitcher />
        </Box>

        <h1 className="text-3xl md:text-4xl font-bold text-center text-sky-600 dark:text-sky-400 mb-6">
          {t("title")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="space-y-4 p-4 border border-slate-300 dark:border-slate-700 rounded-lg">
            <legend className="text-lg font-semibold text-sky-700 dark:text-sky-500 px-2">
              {t("earningsLegend")}
            </legend>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  id="salaryAmount"
                  label={t("salaryAmountLabel")}
                  type="number"
                  value={salaryAmount}
                  onChange={(e) => setSalaryAmount(e.target.value)}
                  placeholder={t("salaryAmountPlaceholder")}
                  variant="outlined"
                  error={isNaN(parseFloat(salaryAmount)) && salaryAmount !== ""}
                  helperText={
                    isNaN(parseFloat(salaryAmount)) && salaryAmount !== ""
                      ? t("errorInvalidSalaryInput")
                      : ""
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="salaryType-label">
                    {t("salaryTypeLabel")}
                  </InputLabel>
                  <Select
                    labelId="salaryType-label"
                    id="salaryType"
                    value={salaryType}
                    label={t("salaryTypeLabel")}
                    onChange={(e) =>
                      setSalaryType(e.target.value as SalaryType)
                    }
                  >
                    {salaryTypeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <CurrencySelectMUI
                  instanceId={salaryFieldId}
                  id="salaryCurrency"
                  aria-labelledby={salaryLabelId}
                  options={currencyOptions}
                  value={salaryCurrency}
                  onChange={(option) =>
                    setSalaryCurrency(option as CurrencyOption)
                  }
                  label={t("currencyLabel")}
                />
              </Grid>
            </Grid>
          </fieldset>

          <fieldset className="space-y-4 p-4 border border-slate-300 dark:border-slate-700 rounded-lg">
            <legend className="text-lg font-semibold text-sky-700 dark:text-sky-500 px-2">
              {t("itemCostLegend")}
            </legend>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  id="productPrice"
                  label={t("productPriceLabel")}
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder={t("productPricePlaceholder")}
                  variant="outlined"
                  error={isNaN(parseFloat(productPrice)) && productPrice !== ""}
                  helperText={
                    isNaN(parseFloat(productPrice)) && productPrice !== ""
                      ? t("errorInvalidPriceInput")
                      : ""
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <CurrencySelectMUI
                  instanceId={productFieldId}
                  id="productCurrency"
                  aria-labelledby={productLabelId}
                  options={currencyOptions}
                  value={productCurrency}
                  onChange={(option) =>
                    setProductCurrency(option as CurrencyOption)
                  }
                  label={t("currencyLabel")}
                />
              </Grid>
            </Grid>
          </fieldset>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            sx={{
              padding: "0.75rem",
              fontWeight: "600",
              backgroundColor: isLoading ? "grey.500" : "#f59e0b",
              "&:hover": {
                backgroundColor: isLoading ? "grey.500" : "#d97706",
              },
            }}
            startIcon={
              isLoading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {isLoading ? t("calculatingButton") : t("calculateButton")}
          </Button>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 2 }}
          >
            {t("calculationAssumptions")}
          </Typography>
        </form>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </div>
      <footer className="mt-8 mb-4 text-center text-sm text-slate-600 dark:text-slate-400 space-y-3">
        <div className="flex justify-center items-center space-x-3">
          {/* <LanguageSwitcher />
          <ThemeSwitcher /> */}
        </div>
        <div>{t("footerText")}</div>
      </footer>

      <ResultModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        calculationResult={calculationResult}
        currentLocale={currentLocale}
      />
    </main>
  );
}
