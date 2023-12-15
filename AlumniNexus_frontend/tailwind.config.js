/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,mustache}", "./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#094446",
        secondary: {
          100: "#C49B4B",
          200: "#F2EEE5",
          300: "#D9BE8C",
          500: "#eaddc4",
        },
        hover: "#63C5DA",
      },
    },
  },
  plugins: [],
};
