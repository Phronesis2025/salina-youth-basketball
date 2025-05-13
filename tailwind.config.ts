/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1C2526", // Navy
        accent: "#D91E18", // Red
        text: "#FFFFFF", // White
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        bebas: ['"Bebas Neue"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
