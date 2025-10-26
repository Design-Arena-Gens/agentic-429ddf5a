/******** Tailwind Config ********/ 
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B57D0',
        accent: '#F59E0B',
        surface: '#0A0A0A'
      }
    }
  },
  plugins: []
};
