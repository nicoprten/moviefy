/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx,js}"],
  theme: {
    extend: {
      width: {
        '100vw': '100vw',
        '80vw': '80vw'
      },
      fontFamily: {
        kanit: ['Kanit', 'Roboto'],
        rubik: ['Rubik']
      },
      display: ["group-hover"],
    },
    colors: {
      'white': '#FFFFFF',
      'black': '#030303',
      'gray-dark': '#141414',
      'gray': '#292929',
      'gray-light': '#9CA3AF',
      'blue-dark': '#123540',
      'blue': '#3092B0'
    }
  },
  plugins: [],
}