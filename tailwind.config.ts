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
        // Rich Warm Terracotta Palette (anchored on #B45309 requested by user, no yellow)
        brand: {
          50: '#FAF8F5',
          100: '#F5EFEB',
          200: '#E8DCD0',
          300: '#D5B89E',
          400: '#C58C5E',
          500: '#B45309',
          600: '#A14707',
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
