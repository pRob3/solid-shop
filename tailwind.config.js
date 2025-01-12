/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      scrollbar: {
        thin: 'scrollbar-thin',
        thumb: 'scrollbar-thumb-gray-400',
        track: 'scrollbar-track-gray-100',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
