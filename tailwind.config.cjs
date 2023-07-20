/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-gray': '#424242',
        'lighter-gray': '#D0CCCC',
        'dark-surface': '#181A1B',
        'little-dark-surface': '#222527',
      },
      backgroundImage: {
        'auth-img':
          "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/src/assets/auth-bg.png')",
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
