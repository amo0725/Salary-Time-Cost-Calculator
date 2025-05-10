"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TimeCost, Currency } from "@/lib/types";
import { MascotDisplay } from "./MascotDisplay";
import { useI18n } from "@/i18n/client";
import type { Locale } from "@/i18n";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculationResult: {
    timeCostData: TimeCost;
    exchangeRateInfo: {
      productCurrency: Currency;
      salaryCurrency: Currency;
      rateApplied: number | null;
    };
  } | null;
  currentLocale: Locale;
}

export function ResultModal({
  isOpen,
  onClose,
  calculationResult,
  currentLocale,
}: ResultModalProps) {
  const t = useI18n();

  if (!calculationResult) return null;

  const { timeCostData, exchangeRateInfo } = calculationResult;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 30,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Close modal on backdrop click
        >
          <motion.div
            className="bg-white dark:bg-slate-800 w-full max-w-md rounded-xl shadow-2xl overflow-hidden ring-1 ring-slate-900/10 dark:ring-slate-100/10"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <div className="p-6 md:p-8 flex flex-col items-center relative">
              <div className="w-full mb-4">
                <h2 className="text-2xl font-semibold text-sky-600 dark:text-sky-400 text-center">
                  {t("resultTitle")}
                </h2>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  aria-label={t("closeButtonLabel")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <p className="text-lg text-center text-slate-700 dark:text-slate-200 mb-4">
                {t("resultIntro")}
              </p>
              <div className="flex flex-row flex-wrap justify-center items-center gap-3 mb-6">
                {timeCostData.years > 0 && (
                  <div className="p-3 bg-sky-50 dark:bg-sky-500/10 rounded-lg w-24 text-center">
                    <span className="block text-2xl md:text-3xl font-bold text-sky-600 dark:text-sky-400">
                      {timeCostData.years}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {t("resultYears")}
                    </span>
                  </div>
                )}
                {(timeCostData.months > 0 || timeCostData.years > 0) && (
                  <div className="p-3 bg-sky-50 dark:bg-sky-500/10 rounded-lg w-24 text-center">
                    <span className="block text-2xl md:text-3xl font-bold text-sky-600 dark:text-sky-400">
                      {timeCostData.months}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {t("resultMonths")}
                    </span>
                  </div>
                )}
                {(timeCostData.days > 0 ||
                  timeCostData.months > 0 ||
                  timeCostData.years > 0) && (
                  <div className="p-3 bg-sky-50 dark:bg-sky-500/10 rounded-lg w-24 text-center">
                    <span className="block text-2xl md:text-3xl font-bold text-sky-600 dark:text-sky-400">
                      {timeCostData.days}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {t("resultDays")}
                    </span>
                  </div>
                )}
                <div className="p-3 bg-sky-50 dark:bg-sky-500/10 rounded-lg w-24 text-center">
                  <span className="block text-2xl md:text-3xl font-bold text-sky-600 dark:text-sky-400">
                    {timeCostData.hours}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {t("resultHours")}
                  </span>
                </div>
              </div>
              <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-2">
                (
                {t("resultTotalHours", {
                  count: timeCostData.totalHours.toLocaleString(currentLocale, {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  }),
                })}
                )
              </p>

              <div className="text-xs text-center text-slate-500 dark:text-slate-400 mb-6">
                {exchangeRateInfo.rateApplied === 1 && (
                  <span>{t("exchangeRateSame")}</span>
                )}
                {exchangeRateInfo.rateApplied !== null &&
                  exchangeRateInfo.rateApplied !== 1 && (
                    <span>
                      {t("exchangeRateApplied", {
                        rate: exchangeRateInfo.rateApplied.toFixed(4),
                        fromCurrency: exchangeRateInfo.productCurrency,
                        toCurrency: exchangeRateInfo.salaryCurrency,
                      })}
                    </span>
                  )}
                {exchangeRateInfo.rateApplied === null && (
                  <span>{t("exchangeRateNotAvailable")}</span>
                )}
              </div>

              <MascotDisplay timeCost={timeCostData} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
