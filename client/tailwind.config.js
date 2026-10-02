/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          dark: '#2A1B16',    // Primary deep coffee brown
          espresso: '#3C2A21',// Secondary espresso brown
          cream: '#EEDCC6',   // Warm cream
          ivory: '#F4E8D1',   // Premium ivory
        },
        brand: {
          primary: '#2A1B16',
          secondary: '#3C2A21',
          cream: '#EEDCC6',
          ivory: '#F4E8D1',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 18s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'steam': 'steam 3s ease-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        steam: {
          '0%': { opacity: '0.2', transform: 'translateY(0) scale(1)' },
          '50%': { opacity: '0.8', transform: 'translateY(-20px) scale(1.1)' },
          '100%': { opacity: '0', transform: 'translateY(-45px) scale(1.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'coffee-glow': '0 0 35px -5px rgba(238, 220, 198, 0.3)',
        'espresso-dark': '0 20px 40px -15px rgba(42, 27, 22, 0.7)',
        'card-lux': '0 10px 30px -10px rgba(42, 27, 22, 0.15)',
      }
    },
  },
  plugins: [],
}
