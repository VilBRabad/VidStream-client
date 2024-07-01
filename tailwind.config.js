/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home_background_image": "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url('./src/assets/home_background.jpg')"
      },
      colors: {
        "brand-color": "#C10909"
      }
    },
  },
  plugins: [],
}

