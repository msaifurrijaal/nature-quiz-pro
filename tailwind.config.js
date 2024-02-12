/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: "#6366f1",
      },
      screens: {
        "2xl": "1320px",
      },
    },
  },
  plugins: [],
};
