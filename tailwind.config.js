/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          100: '#fff',
          200: '#EFEFEF',
          300: '#B3B3B3',
          400: '#1C1C1E'
        },
        primary: {
          100: '#115DA9',
          200: '#0A3967',
          300: '#E4EDFF'
        },
        secondary: {
          100: '#CB3A31',
          200: '#12D79C',
          300: '#FFB831'
        },
        black : {
          500 : '#B1B5BA',
          600 : '#8C8F93',
          700 : '#5C5E61',
          800 : '#2E3032',

        }
      },
      fontFamily: {
        nunito: ['Nunito Sans']
      },
      fontSize: {
        'heading-1': ['60px', '72px'],
        'heading-2': ['48px', '56px'],
        'heading-3': ['36px', '44px'],
        'heading-4': ['30px', '40px'],
        'heading-5': ['24px', '36px'],
        'heading-6': ['20px', '28px'],
        'body-large': ['18px', '28px'],
        'body-small': ['16px', '24px'],
        'caption-large': ['14px', '21px'],
        'caption-small': ['12px', '18px'],
      }
    }
  },
  plugins: [],
}