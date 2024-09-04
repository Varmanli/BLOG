import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#55008A",
        secondary: "#FFAB00",
        neutral: "#414A53",
        success: "#38CB89",
        danger: "#FF5630",
        info: "#377DFF",
      },
    },
  },
  plugins: [],
};
export default config;
