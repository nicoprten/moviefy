/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx,js}"],
  theme: {
    extend: {},
    colors: {
      'white': '#FFFFFF',
      'black': '#030303',
      'gray-dark': '#141414',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'blue': '#3092B0'
    },
    width: {
      'full': '100%',
      'screen': '80vw',
      'cuarto': '25%',
    }
  },
  plugins: [],
}