/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "3/4": "3 / 4",
      },
    },
    colors: {
      primary: "#C7DC55",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      slate: colors.slate,
      transparent: colors.transparent,
    },
    fontFamily: {
      paytone: ["Paytone One"],
      header: ["Space Grotesk"],
      gift: ["Montagu Slab"],
      raleway: ["Raleway"],
    },
  },
  plugins: [
    require("tailwindcss-animated"),
    require("flowbite/plugin"),
    "prettier-plugin-tailwindcss",
  ],
};
