// eslint-disable-next-line
const colors = require('tailwindcss/colors');

// eslint-disable-next-line
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lime: colors.lime
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
