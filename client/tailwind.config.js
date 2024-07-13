/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fffffe",
        secondary: "#d1d1e9",
        backgroundColor: "#fffffe",
        headlineColor: "#2b2c34",
        btnColor: "#6246ea",
        btnTextColor: "#fffffe",
        tertiary: "#e45858",
      }
    },
  },
  plugins: [],
}

