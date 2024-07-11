/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   "home_background_image": "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('public/assets/home_background.jpg')"
      // },
      colors: {
        "brand-color": "#f47521",
        "gray-bg": "#23252b",
        "gray-dk": "#0E0E10",
      }
    },
  },
  plugins: [],
}

