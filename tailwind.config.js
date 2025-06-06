/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Added to cover App Router files
  ],
  theme: {
    extend: {
      colors: {
        navy: "#002C51",
        "project-navy": "#1C2526", // Added project’s primary navy
        red: "#D91E18", // Updated to match project’s red
        white: "#FFFFFF",
        blue: {
          600: "#2563EB",
          700: "#1D4ED8",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  safelist: [
    "bg-[#002C51]",
    "bg-[#1C2526]",
    "text-[#D91E18]",
    "border-[#D91E18]",
    "bg-gray-900/50",
    "border-red-500/50",
    "bg-blue-600",
    "hover:bg-blue-700",
  ],
  plugins: [tailwindcssAnimate],
};

export default config;
