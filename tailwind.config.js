/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        christmas: {
          red: '#B8312F',       // Warmer, deeper red
          green: '#2D5F3F',     // Warmer forest green
          gold: '#D4AF37',      // Softer, antique gold
          darkGreen: '#1C4428', // Rich evergreen
          lightRed: '#D4534D',  // Warm coral red
          cream: '#FFF8E7',     // Warm cream
          burgundy: '#8B2635',  // Deep burgundy
          pine: '#3A5F4B',      // Warm pine green
        }
      },
      fontFamily: {
        heading: ['Philosopher', 'Georgia', 'serif'],
        body: ['Crimson Pro', 'Georgia', 'serif'],
        elegant: ['Cormorant Garamond', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
