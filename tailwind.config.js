/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dynamic: {
          navy: '#0b1d3a',
          blue: '#00529b',
          light: '#0284c7',
          sky: '#e0f2fe',
          surface: '#f8fafc',
          border: '#e2e8f0',
          accent: '#e67e22',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}


