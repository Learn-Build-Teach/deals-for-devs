import type { Config } from 'tailwindcss'

// TODO: Add Colors to Theme

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'pale-gold': '#C4B97AE5',
      },
      backgroundImage: {
        'dropzone-md': "url('/dropzone-md.svg')",
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      lineHeight: {
        '14': '4rem',
        '16': '5.2rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
