/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/Components/**/*.{js,jsx,ts,tsx}',
    './src/App.{js,jsx,ts,tsx}',
  ],  
  theme: {
    extend: {
      colors: {
        customPink: '#F29DAD',
        customRed: '#FF695C',
        customBrown: '#E57556',
        customOrange: '#FF975E',
        customLightOrange: '#F5A65B',
      },
    },
  },
  plugins: [],
}

