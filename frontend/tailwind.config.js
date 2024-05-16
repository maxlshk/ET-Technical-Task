/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin';

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'blobs': 'gradient 14s linear infinite',
      },
      keyframes: {
        'gradient': {
          to: { 'background-position': '300% center' },
        }
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, addBase, theme }) {
      addComponents({
        '.custom-scrollbar::-webkit-scrollbar': {
          width: '5px',
          height: '3px',
          borderRadius: '2px',
        },
        '.custom-scrollbar::-webkit-scrollbar-track': {
          background: theme('colors.gray.200'),
          borderRadius: '50px',
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb': {
          background: theme('colors.gray.400'),
          borderRadius: '50px',
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb:hover': {
          background: theme('colors.gray.500'),
        },

        // Dark theme scrollbar styles
        '.dark .custom-scrollbar::-webkit-scrollbar-track': {
          background: theme('colors.gray.800'),
        },
        '.dark .custom-scrollbar::-webkit-scrollbar-thumb': {
          background: theme('colors.gray.500'),
        },
        '.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover': {
          background: theme('colors.gray.400'),
        },

        '.dotted-line': {
          // Dotted line configurations
          height: '2px',
          backgroundSize: '10px 2px',
          backgroundRepeat: 'repeat-x',
          backgroundImage: `radial-gradient(circle, ${theme('colors.gray.500')} 20%, transparent 20%)`,
        },

        '@media print': {
          'body *, .dark': {
            background: `${theme('colors.white')} !important`,
            color: `${theme('colors.black')} !important`,
          },
        },
      });
    }),
  ],
}
