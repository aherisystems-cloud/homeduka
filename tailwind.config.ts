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
        // Warm Cedar / Earthy Amber Home Palette (Premium, inviting, architectural)
        brand: {
          50: '#FDF8F6',
          100: '#F2E8E5',
          200: '#EADDD7',
          300: '#D5C3BC',
          400: '#BA9C91',
          500: '#A47764',
          600: '#925C47', // Warm Cedar / Terracotta Wood
          700: '#7A4B38',
          800: '#5F3A2B',
          900: '#43281E',
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
