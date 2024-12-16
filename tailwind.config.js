/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#39289F',
        biru: '#0D6EFD',
        oren: '#FA8305',
      },
      fontFamily: {
        poppins: 'Poppins, serif',
        roboto: 'Roboto, sans-serif',
      },
    },
  },
  plugins: [],
};
