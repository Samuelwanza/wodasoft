/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        MissionCard: "4px 4px 40px 0px rgba(69, 189, 230, 0.25);",
      },
    },
    colors: {
      primary: "#2B2B34",
      secondary: "#45BDE6",
      "darkBlue-900": "#273240",
      "grey-900": "#57626C",
      greyLight: "rgba(100,111,121,0.26)",
      error: "#FF003D",
      warning: "#FFBF27",
      white: "#ffffff",
      black: "#000000",
    },
    // fontSize: {
    //   '2xs': "11px",
    // },
  },
  plugins: [require("@tailwindcss/forms")],
};
