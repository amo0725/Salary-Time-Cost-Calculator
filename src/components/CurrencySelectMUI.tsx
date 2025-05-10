"use client";

import * as React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { Currency } from "@/lib/types"; // Assuming this is your Currency enum/type

// Re-using CurrencyOption from your existing setup
export interface CurrencyOption {
  value: Currency;
  label: string;
  countryCode?: string; // For flag emoji
}

interface CurrencySelectMUIProps {
  id?: string;
  instanceId?: string; // For unique ID if needed, though less critical for MUI select
  value: CurrencyOption | null | ""; // Allow empty string for placeholder
  onChange: (selectedOption: CurrencyOption | null) => void;
  options: CurrencyOption[];
  label?: string; // Label for the select
  "aria-labelledby"?: string;
  disabled?: boolean;
}

// Helper to get the string value for MUI Select, as it doesn't directly support object values well for the native select props
const getDisplayValue = (option: CurrencyOption | null | "") => {
  if (!option || typeof option === "string") return "";
  return option.value; // Use currency code as the internal value for MUI Select
};

export function CurrencySelectMUI({
  id,
  instanceId, // You might use this to generate a more unique id if needed
  value,
  onChange,
  options,
  label,
  "aria-labelledby": ariaLabelledBy,
  disabled,
}: CurrencySelectMUIProps) {
  // const muiTheme = useTheme(); // Removed as muiTheme constant is not actively used for sx props currently

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value as Currency;
    const selectedOption =
      options.find((opt) => opt.value === selectedValue) || null;
    onChange(selectedOption);
  };

  const internalSelectId =
    id || (instanceId ? `${instanceId}-select` : undefined);
  const labelId =
    ariaLabelledBy ||
    (label && internalSelectId ? `${internalSelectId}-label` : undefined);

  return (
    <FormControl fullWidth variant="outlined" disabled={disabled}>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <Select
        labelId={labelId}
        id={internalSelectId}
        value={getDisplayValue(value)}
        onChange={handleChange}
        label={label} // Required for outlined variant to correctly position the label
        MenuProps={{
          PaperProps: {
            sx: {
              // Example: style the dropdown menu paper
              // maxHeight: 300,
              // boxShadow: muiTheme.shadows[3],
              // backgroundColor: muiTheme.palette.mode === 'dark' ? muiTheme.palette.grey[800] : muiTheme.palette.background.paper,
            },
          },
        }}
        sx={{
          // Component-specific styling using sx prop if global overrides in theme are not enough
          // The global overrides in muiTheme.ts for MuiOutlinedInput and MuiSelect should handle background and border
          width: "100%",
          ".MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            // paddingTop: "14px", // Removed to use MUI default
            // paddingBottom: "14px", // Removed to use MUI default
            // minHeight: "1.5em", // Removed to use MUI default
          },
          ".MuiSelect-icon": {
            // color: muiTheme.palette.text.secondary, // Example to color dropdown icon
          },
        }}
      >
        {/* Optional: Add a placeholder/default item if value can be null/empty and you want a non-selectable first item */}
        {/* <MenuItem value="" disabled><em>{label || 'Select...'}</em></MenuItem> */}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Box
              component="span"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {option.countryCode && (
                <span style={{ marginRight: "8px" }}>{option.countryCode}</span>
              )}
              {option.label}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
