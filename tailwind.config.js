/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        plaster: ['Plaster', 'sans-serif'],
        sofia: ['"Sofia Pro"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
