import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#faf9f6',
        'off-black': '#111111',
        'dark-neutral': '#313130',
        'mid-neutral': '#626260',
        muted: '#7b7b78',
        oat: '#dedbd6',
        sand: '#d3cec6',
        orange: {
          DEFAULT: '#ff5600',
          hover: '#e64d00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        'tightest': '-0.15em',
        'tighter-xl': '-0.12em',
        'tighter-lg': '-0.08em',
        'tighter-md': '-0.05em',
        'tighter-sm': '-0.03em',
        'tighter-xs': '-0.02em',
      },
      lineHeight: {
        '100': '1.00',
        '95': '0.95',
      },
      borderRadius: {
        'btn': '4px',
        'card': '8px',
      },
      transitionProperty: {
        'transform': 'transform',
      },
    },
  },
  plugins: [],
}
export default config
