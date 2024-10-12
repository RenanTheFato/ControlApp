/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend:{
      colors:{
        'carbon-black': '#2C2C2C',
        'off-white': '#FBF7F5',
        transparent: 'transparent',
        'azure-radiance': {
          50: '#f1f8fd',
          10: '#dfeffa',
          200: '#c6e3f7',
          300: '#9fd2f1',
          400: '#71b8e9',
          500: '#509ce1',
          600: '#3b81d5',
          700: '#326dc3',
          800: '#2e599f',
          900: '#2a4c7e',
          950: '#1e304d',
      },
      'bay-of-many': {
        50: '#ecf4ff',
        100: '#ddebff',
        200: '#c1daff',
        300: '#9cc0ff',
        400: '#749bff',
        500: '#5477ff',
        600: '#354df6',
        700: '#293cd9',
        800: '#2435af',
        900: '#243285',
        950: '#161c50',
    }, 
  },
  boxShadow:{
    'signature': '4px 6px 16px 0px rgba(0, 0, 0, 0.25)'
  }
},
  },
  plugins: [],
}