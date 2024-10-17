/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightblue: "#E0F7FA", // You can choose any light blue color code
        mainBlue: "#172554",
      },
    },
  },
  plugins: [],
};
