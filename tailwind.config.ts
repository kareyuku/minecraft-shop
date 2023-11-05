import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/*.{ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./panelComponents/**/*.{js,tx,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#101129",
        secondary: "#26254F",
        third: "#7B62FF",
        background: "#101129",
      },
    },
  },
  daisyui: {
    base: false,
  },
  plugins: [require("daisyui")],
};
export default config;
