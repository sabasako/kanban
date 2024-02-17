import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        "sidebar-width": "var(--sidebar-width)",
        "header-height": "var(--header-height)",
      },
      colors: {
        "c-black": "#000112",
        "c-white": "#fff",

        "c-main-purple": "#635FC7",
        "c-main-purple-hover": "#A8A4FF",

        "c-main-red": "#EA5555",
        "c-main-red-hover": "#FF9898",

        "c-very-dark-grey": "#20212C",
        "c-dark-grey": "#2B2C37",
        "c-medium-grey": "#828FA3",
        "c-light-grey": "#F4F7FD",

        "c-lines-dark": "#3E3F4E",
        "c-lines-light": "#E4EBFA",
      },
    },
    screens: {
      xl: { max: "1279px" },
      lg: { max: "920px" },
      md: { max: "767px" },
      sm: { max: "639px" },
      xs: { max: "500px" },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
