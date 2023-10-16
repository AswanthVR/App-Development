/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}","./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: { fontFamily: ['  ', 'sans-serif' ],},
  },
  plugins: [require("tw-elements/dist/plugin.cjs" )],
  
  darkMode: "class",

  zoomIn : ['animate-[fade-in_1s_ease-in-out]', 'animate-[fade-in-down_1s_ease-in-out]']

}

 