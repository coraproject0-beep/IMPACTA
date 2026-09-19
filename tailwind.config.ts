import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        navy: {
          900: "#0b1329",
          800: "#111c38",
          700: "#1a284e",
        },
        cobalt: {
          50: "#eef4ff",
          100: "#d9e5ff",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
        }
      },
    },
  },
  plugins: [],
};
export default config;
