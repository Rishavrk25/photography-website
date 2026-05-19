/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#1A1A1A',
          200: '#141414',
          300: '#0F0F0F',
          400: '#0A0A0A',
        },
        gold: {
          light: '#E8C84A',
          DEFAULT: '#D4AF37',
          dark: '#B8960C',
        },
        cream: '#F8F6F2',
        gray: {
          soft: '#CFCFCF',
        }
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
