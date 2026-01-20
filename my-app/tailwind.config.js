/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4a90d9",
        secondary: "#D9524A",
        accent: "#F8B328",
        textLight: "#1a1a1a",
        textDark: "#ffffff",
        bgLight: "#ffffff",
        bgDark: "#1a1a1a",
      },
    },
  },
  plugins: [],
};
