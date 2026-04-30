/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0B0D17', // Deep space dark
        surface: '#1A1D2D', // Card background
        primary: '#6366f1', // Indigo
        secondary: '#a855f7', // Purple
        accent: '#2dd4bf', // Teal
        success: '#22c55e', // Green
        warning: '#f59e0b', // Amber
        error: '#ef4444', // Red
        muted: '#94a3b8', // Slate gray
      },
      fontFamily: {
        sans: ['Inter', 'Satoshi', 'system-ui', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
        display: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'mesh-dark': 'radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,0.2) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,0.2) 0, transparent 50%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(99,102,241,0.2), 0 0 20px rgba(99,102,241,0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(99,102,241,0.6), 0 0 30px rgba(99,102,241,0.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        }
      }
    },
  },
  plugins: [],
}
