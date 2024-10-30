/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        p1: '#FFF8D6',
        p2: '#FFD966',
        p3: '#D4A017',
        p4: '#FFCC33',
        p5: '#E6B800',
      },
      fontFamily: {
        inter: ["Inter", "system-ui"],
        gowun: ["Gowun Dodum", "sans-serif"],
        nasa: ["Nasa", "sans-serif"],
      },
    },
  },
  plugins: [],
}