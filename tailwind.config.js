/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Permite usar la clase 'dark' en el body o contenedor
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode
        primary: {
          DEFAULT: '#4F46E5', // Indigo 600
          light: '#818CF8',   // Indigo 400
          dark: '#3730A3',    // Indigo 800
        },
        secondary: {
          DEFAULT: '#EC4899', // Pink 500
          light: '#F472B6',   // Pink 400
          dark: '#BE185D',    // Pink 700
        },
        accent: {
          DEFAULT: '#F59E0B', // Amber 500
          light: '#FBBF24',   // Amber 400
          dark: '#B45309',    // Amber 700
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'page': '#F9FAFB',
        'card': '#FFFFFF',
      }),
      textColor: theme => ({
        ...theme('colors'),
      }),
      borderColor: theme => ({
        ...theme('colors'),
      }),
    },
  },
  plugins: [],
}
