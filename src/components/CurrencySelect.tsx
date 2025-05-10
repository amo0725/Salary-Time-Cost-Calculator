"use client";

import Select, { Props as SelectProps, StylesConfig } from "react-select";
import { Currency } from "@/lib/types";

export interface CurrencyOption {
  value: Currency;
  label: string;
  countryCode?: string;
}

interface CurrencySelectProps
  extends Omit<
    SelectProps<CurrencyOption, false>,
    "styles" | "theme" | "className" | "classNamePrefix"
  > {
  // instanceId is recommended by react-select for SSR and multiple instances
  // It can be generated e.g. using useId() from React
  instanceId?: string;
  id?: string;
  "aria-labelledby"?: string;
}

// Define customStyles again
const customStyles: StylesConfig<CurrencyOption, false> = {
  control: (provided, state) => {
    return {
      ...provided,
      backgroundColor: "var(--rs-control-bg)",
      borderColor: state.isFocused
        ? "var(--rs-control-focused-border-color)"
        : "var(--rs-control-border-color)",
      borderWidth: "1px",
      borderRadius: "0.375rem",
      borderStyle: "solid",
      boxShadow: state.isFocused
        ? `0 0 0 1px var(--rs-control-focused-border-color)`
        : "none",
      outline: "none",
      minHeight: "auto",
      fontSize: "1rem",
      lineHeight: "1.5rem",
      "&:hover": {
        borderColor: "var(--rs-control-hover-border-color)",
      },
    };
  },
  valueContainer: (provided) => {
    return {
      ...provided,
      padding: "0.5rem 0.75rem",
      alignItems: "center",
      backgroundColor: undefined,
    };
  },
  input: (provided) => {
    return {
      ...provided,
      color: "var(--rs-input-text-color)",
      margin: "0px",
      paddingTop: "0px",
      paddingBottom: "0px",
      lineHeight: "inherit",
      // backgroundColor will be handled by the overall control's transparency (neutral0)
    };
  },
  singleValue: (provided) => {
    return {
      ...provided,
      color: "var(--rs-input-text-color)",
      lineHeight: "inherit",
      backgroundColor: "transparent",
    };
  },
  placeholder: (provided) => ({
    ...provided,
    color: "var(--rs-placeholder-color)",
    lineHeight: "inherit",
    // backgroundColor: "transparent", // Placeholder usually doesn't need a BG
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "var(--rs-menu-bg)",
    borderRadius: "0.375rem",
    boxShadow:
      "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
    marginTop: "4px",
    zIndex: 50,
    border: "1px solid var(--rs-menu-border-color)",
  }),
  menuList: (provided) => ({
    ...provided,
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "var(--rs-option-selected-bg)"
      : state.isFocused
      ? "var(--rs-option-focused-bg)"
      : "transparent",
    color: state.isSelected
      ? "var(--rs-option-selected-text)"
      : "var(--rs-option-text)",
    padding: "0.5rem 0.75rem",
    cursor: "pointer",
    fontSize: "1rem",
    "&:active": {
      backgroundColor: !state.isSelected
        ? "var(--rs-option-active-bg)"
        : undefined,
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "0.5rem 0.75rem",
    color: "var(--rs-indicator-color)",
    "&:hover": {
      color: "var(--rs-indicator-hover-color)",
    },
  }),
};

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  instanceId,
  id,
  "aria-labelledby": ariaLabelledBy,
  ...props
}) => {
  const isDarkMode =
    typeof window !== "undefined" &&
    window.document.documentElement.classList.contains("dark");

  return (
    <Select<CurrencyOption, false>
      {...props}
      styles={customStyles}
      instanceId={instanceId}
      inputId={id}
      aria-labelledby={ariaLabelledBy}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          neutral0: isDarkMode ? "transparent" : "var(--rs-control-bg)",
          neutral5: isDarkMode ? "transparent" : theme.colors.neutral5,
          neutral10: isDarkMode
            ? "var(--rs-control-border-color)"
            : theme.colors.neutral10,
          neutral20: isDarkMode
            ? "var(--rs-control-border-color)"
            : theme.colors.neutral20,
          neutral30: isDarkMode
            ? "var(--rs-control-hover-border-color)"
            : theme.colors.neutral30,
          neutral40: isDarkMode
            ? "var(--rs-indicator-color)"
            : theme.colors.neutral40,
          neutral50: "var(--rs-placeholder-color)",
          neutral80: "var(--rs-input-text-color)",
          primary: "var(--rs-option-selected-bg)",
          primary25: "var(--rs-option-focused-bg)",
        },
      })}
    />
  );
};

export { CurrencySelect };
