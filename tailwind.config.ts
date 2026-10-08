import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Rich Warm Terracotta / Amber Home Palette (exact #B45309 matching user selection)
        brand: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309', // Exact color requested by user
          800: '#92400E',
          900: '#78350F',
          950: '#451A03',
        },
        // Deep warm slate neutrals for grounded elegance
        home: {
          slate: '#1E293B',
          sand: '#F8F6F0',
          cream: '#FFFDF9',
          wood: '#854D0E',
          clay: '#C2410C',
          forest: '#1E3A2F',
        }
      },
    },
  },
  plugins: [],
};
export default config;
