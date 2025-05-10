"use client";

// import Image from 'next/image'; // Removed as emoji is used
import { TimeCost } from "@/lib/types";
import { useI18n } from "@/i18n/client";
import type { LocaleMessages } from "@/i18n";

interface MascotDisplayProps {
  timeCost?: TimeCost | null;
}

const selectRandomKey = (keys: (keyof LocaleMessages)[]) => {
  return keys[Math.floor(Math.random() * keys.length)];
};

const getMascotThoughtKey = (totalHours: number): keyof LocaleMessages => {
  if (totalHours <= 0)
    return selectRandomKey([
      "mascotThoughtInstant_1",
      "mascotThoughtInstant_2",
      "mascotThoughtInstant_3",
      "mascotThoughtInstant_4",
      "mascotThoughtInstant_5",
    ]);
  if (totalHours <= 0.5)
    return selectRandomKey([
      "mascotThoughtInstant_1",
      "mascotThoughtInstant_2",
      "mascotThoughtInstant_3",
      "mascotThoughtInstant_4",
      "mascotThoughtInstant_5",
    ]);
  if (totalHours <= 2)
    return selectRandomKey([
      "mascotThoughtQuick_1",
      "mascotThoughtQuick_2",
      "mascotThoughtQuick_3",
      "mascotThoughtQuick_4",
      "mascotThoughtQuick_5",
    ]);
  if (totalHours <= 4)
    return selectRandomKey([
      "mascotThoughtAFewHours_1",
      "mascotThoughtAFewHours_2",
      "mascotThoughtAFewHours_3",
      "mascotThoughtAFewHours_4",
      "mascotThoughtAFewHours_5",
    ]);
  if (totalHours <= 8)
    return selectRandomKey([
      "mascotThoughtHalfDay_1",
      "mascotThoughtHalfDay_2",
      "mascotThoughtHalfDay_3",
      "mascotThoughtHalfDay_4",
      "mascotThoughtHalfDay_5",
    ]);
  if (totalHours <= 12)
    return selectRandomKey([
      "mascotThoughtOneDay_1",
      "mascotThoughtOneDay_2",
      "mascotThoughtOneDay_3",
      "mascotThoughtOneDay_4",
      "mascotThoughtOneDay_5",
    ]);
  if (totalHours <= 40)
    return selectRandomKey([
      "mascotThoughtSeveralDays_1",
      "mascotThoughtSeveralDays_2",
      "mascotThoughtSeveralDays_3",
      "mascotThoughtSeveralDays_4",
      "mascotThoughtSeveralDays_5",
    ]);
  if (totalHours <= 50)
    return selectRandomKey([
      "mascotThoughtOneWeek_1",
      "mascotThoughtOneWeek_2",
      "mascotThoughtOneWeek_3",
      "mascotThoughtOneWeek_4",
      "mascotThoughtOneWeek_5",
    ]);
  if (totalHours <= 80)
    return selectRandomKey([
      "mascotThoughtCoupleOfWeeks_1",
      "mascotThoughtCoupleOfWeeks_2",
      "mascotThoughtCoupleOfWeeks_3",
      "mascotThoughtCoupleOfWeeks_4",
      "mascotThoughtCoupleOfWeeks_5",
    ]);
  if (totalHours <= 160)
    return selectRandomKey([
      "mascotThoughtSeveralWeeks_1",
      "mascotThoughtSeveralWeeks_2",
      "mascotThoughtSeveralWeeks_3",
      "mascotThoughtSeveralWeeks_4",
      "mascotThoughtSeveralWeeks_5",
    ]);
  if (totalHours <= 200)
    return selectRandomKey([
      "mascotThoughtOneMonth_1",
      "mascotThoughtOneMonth_2",
      "mascotThoughtOneMonth_3",
      "mascotThoughtOneMonth_4",
      "mascotThoughtOneMonth_5",
    ]);
  if (totalHours <= 480)
    return selectRandomKey([
      "mascotThoughtCoupleOfMonths_1",
      "mascotThoughtCoupleOfMonths_2",
      "mascotThoughtCoupleOfMonths_3",
      "mascotThoughtCoupleOfMonths_4",
      "mascotThoughtCoupleOfMonths_5",
    ]);
  if (totalHours <= 960)
    return selectRandomKey([
      "mascotThoughtSeveralMonths_1",
      "mascotThoughtSeveralMonths_2",
      "mascotThoughtSeveralMonths_3",
      "mascotThoughtSeveralMonths_4",
      "mascotThoughtSeveralMonths_5",
    ]);
  if (totalHours <= 1920)
    return selectRandomKey([
      "mascotThoughtManyMonths_1",
      "mascotThoughtManyMonths_2",
      "mascotThoughtManyMonths_3",
      "mascotThoughtManyMonths_4",
      "mascotThoughtManyMonths_5",
    ]);
  return selectRandomKey([
    "mascotThoughtAYearPlus_1",
    "mascotThoughtAYearPlus_2",
    "mascotThoughtAYearPlus_3",
    "mascotThoughtAYearPlus_4",
    "mascotThoughtAYearPlus_5",
  ]);
};

export function MascotDisplay({ timeCost }: MascotDisplayProps) {
  const t = useI18n();

  if (!timeCost || timeCost.totalHours < 0) {
    return null;
  }

  const thoughtKey = getMascotThoughtKey(timeCost.totalHours);
  const thought = t(thoughtKey, {
    count: timeCost.totalHours,
    fromCurrency: undefined,
    rate: undefined,
    toCurrency: undefined,
  });

  return (
    <div className="mt-4 flex flex-col items-center text-center p-4 rounded-lg shadow-md ring-1 ring-sky-100 dark:ring-slate-700/50 w-full">
      <div className="relative max-w-xs mb-3">
        <div className="bg-sky-100 dark:bg-sky-700/80 text-sky-800 dark:text-sky-100 p-3 rounded-lg shadow-md">
          <p className="text-sm italic">&ldquo;{thought}&rdquo;</p>
        </div>
      </div>

      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transform transition-transform hover:scale-105 overflow-hidden">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-label="Friendly Robot Mascot"
        >
          {/* Antenna */}
          <line
            x1="50"
            y1="10"
            x2="50"
            y2="2"
            stroke="#60a5fa"
            strokeWidth="2"
          />
          <circle cx="50" cy="12" r="3" fill="#60a5fa" />
          {/* Head */}
          <rect
            x="30"
            y="20"
            width="40"
            height="30"
            rx="5"
            fill="#94a3b8"
            stroke="#475569"
            strokeWidth="1.5"
          />
          {/* Eyes */}
          <circle cx="42" cy="35" r="4" fill="#f1f5f9" />
          <circle cx="41" cy="35" r="1.5" fill="#0f172a" /> {/* Pupil Left */}
          <circle cx="58" cy="35" r="4" fill="#f1f5f9" />
          <circle cx="57" cy="35" r="1.5" fill="#0f172a" /> {/* Pupil Right */}
          {/* Mouth (optional simple smile) */}
          <path
            d="M 40 42 Q 50 47 60 42"
            stroke="#475569"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Body */}
          <rect
            x="25"
            y="50"
            width="50"
            height="35"
            rx="5"
            fill="#64748b"
            stroke="#334155"
            strokeWidth="1.5"
          />
          {/* Neck (subtle) */}
          <rect x="45" y="46" width="10" height="5" fill="#475569" />
          {/* Decorative elements on body (optional) */}
          <circle cx="35" cy="60" r="3" fill="#fbbf24" />
          <rect x="45" y="65" width="10" height="10" rx="2" fill="#38bdf8" />
        </svg>
      </div>
    </div>
  );
}

// Minimal bounce animation for the emoji (add to tailwind.config.ts or globals.css if more complex)
// For now, let's define a simple one if needed, or rely on existing Tailwind utilities.
// A `animate-bounce-slow` might need to be custom. For now, let's remove it to avoid undefined class issues.
// If you want a slow bounce, you would add to tailwind.config.js theme.extend.animation and keyframes.
// Example for tailwind.config.ts:
// theme: {
//   extend: {
//     animation: {
//       'bounce-slow': 'bounce 3s infinite',
//     }
//   }
// }
