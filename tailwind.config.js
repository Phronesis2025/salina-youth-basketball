/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#002C51",
        red: "#F11A20",
        white: "#FFFFFF",
        blue: {
          600: "#2563EB",
          700: "#1D4ED8",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
