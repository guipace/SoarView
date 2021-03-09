const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#51c2d5',
        'secondary': '#bbf1fa',
        'tertiary': '#aaaaaa',
        'accent': '#ec4646',
        'background': '#f4f9f9',
      },
      fontFamily: {
        'hind': ['Hind', ...defaultTheme.fontFamily.sans],
        'fira': ['"Fira Sans"', ...defaultTheme.fontFamily.sans],
        'noto': ['"Noto Sans"', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: theme => ({
        'background1': "url('https://soarview.s3.amazonaws.com/background1.jpg')",
      })
    },
  },
  variants: {
    extend: {
      scale: ['group-hover'],
    },
  },
  plugins: [],
}
