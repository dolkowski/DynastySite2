import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0b0f',
        panel: '#141823',
        panelAlt: '#1b2030',
        border: '#2c3347',
        accent: '#e10600',
        muted: '#98a2b3',
        good: '#14b86a',
        warn: '#d4a72c'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(225, 6, 0, 0.15), 0 10px 30px rgba(0,0,0,.4)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Oswald', 'Inter', 'sans-serif']
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at top right, rgba(225, 6, 0, .24), transparent 55%)'
      }
    }
  },
  plugins: []
};

export default config;
