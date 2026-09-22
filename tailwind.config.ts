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
        impacta: {
          black: "#090A0A",
          graphite: "#171819",
          titanium: "#6F7375",
          hairline: "#D7D9D8",
          offwhite: "#F4F5F3",
          white: "#FFFFFF",
        },
        emergency: {
          DEFAULT: "#DC2626",
          50: "#FEF2F2",
          600: "#DC2626",
        },
        success: {
          DEFAULT: "#16A34A",
          50: "#F0FDF4",
          600: "#16A34A",
        },
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
