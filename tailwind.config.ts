import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./panelComponents/**/*.{js,tx,jsx,tsx,mdx}",
    "./modals/**/*.{js,tx,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#191324",
        secondary: "#30273E",
        third: "#5D49BD",
      },
    },
  },
  daisyui: {
    base: false,
  },
  plugins: [require("daisyui")],
};
export default config;
