/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Glamorous color scheme for CitrusInsight AI
        primary: {
          50: '#fef7e6',
          100: '#fdecc0',
          200: '#fce096',
          300: '#fbd46c',
          400: '#faca4d',
          500: '#f9c02e',
          600: '#f8ba29',
          700: '#f7b223',
          800: '#f6aa1d',
          900: '#f59c12',
        },
        secondary: {
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50',
          600: '#43a047',
          700: '#388e3c',
          800: '#2e7d32',
          900: '#1b5e20',
        },
        accent: {
          50: '#fff3e0',
          100: '#ffe0b2',
          200: '#ffcc80',
          300: '#ffb74d',
          400: '#ffa726',
          500: '#ff9800',
          600: '#fb8c00',
          700: '#f57c00',
          800: '#ef6c00',
          900: '#e65100',
        },
      },
    },
  },
  plugins: [],
}
