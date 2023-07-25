/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

export default {
  content: [
    "./src/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        blue: '#2526A9',
        black: '#464646',
        black0: '#000000',
        pink: '#C32AE0',
        'pink-a300': '#F7138F',
        green: '#00DBA6',
        'gray-150': '#C4C4C4',
        'gray-300': '#d9d9d9',
        'gray-text': '#828282',
        'gray-disabled': '#BDBDBD',
        'error': '#FF0000',
      },
      fontFamily: {
        sans: ['Circe', 'sans-serif'],
      },
      zIndex: {
        '1': '1',
      },

    },
  },
  plugins: [
    
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl') },
      })
    })
  ],
}