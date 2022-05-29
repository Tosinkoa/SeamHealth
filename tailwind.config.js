const plugin = require("tailwindcss/plugin");

module.exports = {
  darkmode: "class",
  content: ["./pages/**/*.{js,ts,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      "my-font": ["Nunito", "sans-serif"],
      "logo-font": ["Ultra", "serif"],
      raleway: ["Raleway", "sans-serif"],
    },
    extend: {
      screens: {
        sm: "1px",
      },
    },
  },
};
