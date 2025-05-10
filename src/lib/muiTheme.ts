import { ThemeOptions } from "@mui/material/styles";

export const getDesignTokens = (mode: "light" | "dark"): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Palette values for light mode
          primary: {
            main: "#0288d1", // Corresponds to Tailwind's sky-600
          },
          secondary: {
            main: "#f48fb1", // Corresponds to Tailwind's pink-300
          },
          background: {
            default: "#ffffff",
            paper: "#f5f5f5", // Tailwind's gray-100
          },
          text: {
            primary: "#1A1A1A", // Darker gray for better contrast
            secondary: "#555555", // Darker gray for better contrast
          },
        }
      : {
          // Palette values for dark mode
          primary: {
            main: "#29b6f6", // Corresponds to Tailwind's sky-400
          },
          secondary: {
            main: "#ce93d8", // Corresponds to Tailwind's purple-200
          },
          background: {
            default: "transparent", // Target: make it transparent like other inputs
            paper: "#1e1e1e",
          },
          text: {
            primary: "#e0e0e0", // Tailwind's gray-200
            secondary: "#bdbdbd", // Tailwind's gray-400
          },
        }),
  },
  typography: {
    fontFamily: "inherit", // Inherit from Tailwind's body font
  },
  components: {
    // Example: Default props for all MUI Buttons
    MuiButtonBase: {
      defaultProps: {
        // disableRipple: true, // Disable ripple effect globally if desired
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    // Specific overrides for TextField and Select to achieve desired styling
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          // In dark mode, make background transparent
          ...(theme.palette.mode === "dark" && {
            backgroundColor: "transparent",
            // Ensure border is visible against transparent bg
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.grey[700], // Adjust as needed
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.grey[500], // Adjust as needed
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          }),
          // In light mode, use a standard paper-like background or light gray
          ...(theme.palette.mode === "light" && {
            backgroundColor: theme.palette.grey[50], // e.g. slate-50 from Tailwind
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.grey[300], // e.g. slate-300
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.grey[400], // e.g. slate-400
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          }),
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...(theme.palette.mode === "dark" && {
            backgroundColor: "transparent",
          }),
          ...(theme.palette.mode === "light" && {
            backgroundColor: theme.palette.grey[50],
          }),
        }),
        // Potentially style icon and other parts if needed
      },
    },
  },
});
