const path = require('path')
const defaultTheme = require('tailwindcss/defaultTheme')
const fromRoot = (p) => path.join(__dirname, p)

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  theme: {
    screens: {
      sm: '545px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1920px',
    },
    colors: {
      black: 'var(--color-black)',
      white: 'var(--color-white)',
      pink: 'var(--color-pink)',
      gray: 'var(--color-gray)',
      primary: 'var(--color-primary)',
    },
    textColor: {
      'body-color': 'var(--color-body-color)',
    },
    backgroundColor: {
      'body-bg': 'var(--color-body-bg)',
    },
    extend: {},
  },
  variants: {},
  purge: {
    mode: 'layers',
    enabled: process.env.NODE_ENV === 'production',
    content: [fromRoot('./app/**/*.+(js|ts|tsx|mdx|md)')],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
