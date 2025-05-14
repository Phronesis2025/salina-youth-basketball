/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#002C51",
        red: "#F11A20",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
