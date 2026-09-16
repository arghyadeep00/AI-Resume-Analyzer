/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        border: "var(--color-border)",
        "text-muted": "var(--color-text-muted)",
        "text-dark": "var(--color-text-dark)",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
