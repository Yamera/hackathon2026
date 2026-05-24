/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bg: '#080810',
        surface: '#0F0F1A',
        elevated: '#161625',
        card: '#1A1A2E',
        border: 'rgba(255,255,255,0.06)',
        purple: {
          DEFAULT: '#7C3AED',
          light: '#A78BFA',
          bright: '#8B5CF6',
          dark: '#5B21B6',
        },
        pink: {
          DEFAULT: '#DB2777',
          light: '#F472B6',
        },
        cyan: {
          DEFAULT: '#0891B2',
          light: '#67E8F9',
        },
        amber: {
          DEFAULT: '#D97706',
          light: '#FCD34D',
        },
      },
      fontFamily: {
        sans: ['Inter_400Regular'],
        medium: ['Inter_500Medium'],
        semibold: ['Inter_600SemiBold'],
        bold: ['Inter_700Bold'],
        extrabold: ['Inter_800ExtraBold'],
      },
    },
  },
  plugins: [],
};
