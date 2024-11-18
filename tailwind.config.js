/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#43c3d1",
        secondary: "#2884ff",
        tertiary: "#061123",
        accent: "#39EEEE",
        dark: "#191919",
      },
      fontFamily: {
        primary: ["Questrial", "sans"],
      },
    },
  },
  plugins: [],
};
