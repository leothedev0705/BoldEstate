/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fffe',
          100: '#ccfbff',
          200: '#99f5ff',
          300: '#5ceaff',
          400: '#00eaff',
          500: '#00c5db',
          600: '#009bb3',
          700: '#00798a',
          800: '#005961',
          900: '#003d42',
        },
        violet: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#7b2ff7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#0a0a0a',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Playfair Display', 'serif'],
      },
      fontSize: {
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyan-violet': 'linear-gradient(135deg, #00eaff 0%, #7b2ff7 100%)',
        'violet-cyan': 'linear-gradient(135deg, #7b2ff7 0%, #00eaff 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'magnetic': 'magnetic 0.3s ease-out',
        'text-slide': 'text-slide 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(0, 234, 255, 0.6)' },
          '100%': { boxShadow: '0 0 25px rgba(123, 47, 247, 0.8)' },
        },
        magnetic: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        'text-slide': {
          '0%, 30%': { transform: 'translateY(0)' },
          '35%, 65%': { transform: 'translateY(-100%)' },
          '70%, 100%': { transform: 'translateY(-200%)' },
        }
      },
      dropShadow: {
        'glow': '0 0 15px rgba(0, 234, 255, 0.6)',
        'glow-violet': '0 0 15px rgba(123, 47, 247, 0.6)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
} 