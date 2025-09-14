// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#00FF99",
        background: "#0f0f20",
        dark: "#2222",
        primary: "#55008A",
        secondary: "#FFAB00",
        neutral: "#414A53",
        success: "#38CB89",
        danger: "#FF5630",
        info: "#377DFF",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
