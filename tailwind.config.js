/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0a0a',
          card: '#141414',
        },
        surface: {
          elevated: '#1f1f1f',
          hover: '#2a2a2a',
        },
        accent: '#d4af37',
        success: '#22c55e',
      },
    },
  },
  plugins: [],
}