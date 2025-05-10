import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Added for next-themes
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Kept for wider compatibility
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Primary for App Router
    "./src/app/globals.css", // Specifically include globals.css
  ],
  theme: {
    extend: {
      // Example theme extensions, can be customized
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Example: Add custom colors for themes if needed
        // dark: {
        //   background: '#1a202c',
        //   text: '#e2e8f0',
        // },
        // light: {
        //   background: '#ffffff',
        //   text: '#1a202c',
        // }
      },
    },
  },
  plugins: [],
};
export default config;
