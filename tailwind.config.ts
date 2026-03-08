import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0A0B0E',
        panel: '#141820',
        panelAlt: '#1A1F2B',
        line: '#2A3040',
        brand: '#DA1E28',
        muted: '#A1A8B8',
        success: '#2AA876',
        warn: '#E1A500'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(218,30,40,0.35), 0 18px 50px rgba(0,0,0,0.35)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Barlow Condensed', 'Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
