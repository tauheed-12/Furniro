/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text-primary': '#9F9F9F',
        'text-secondary': '#B88E2F'
      },
      backgroundColor: {
        'primary': '#B88E2F',
        'tertiary': '#FFF3E3',
        'secondary': '#FFFFFF',
        'quaternary': '#FCF8F3',
        'productHover': '#3A3A3A',
        'main': '#FAF3EA',
      },
      backgroundImage: {
        'banner': "url('../assets/banner.png')",
        'hero': "url('../assets/hero.png')"
      },
      fontWeight: {
        'w1': 450,
        'w2': 700,
        'w3': 900
      }
    },
  },
  plugins: [],
}