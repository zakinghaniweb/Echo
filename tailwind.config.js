/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brandColor': '#62FFB4',
        'brandColorHover': '#57d99a',
        'bgColor': '#4CAB72',
      }
    },
    container: {
      center: true
    },
    fontFamily: {
      'Poppins': ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
}