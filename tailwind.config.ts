import type { Config } from 'tailwindcss'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
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
      // aurora-gradient animation defined in globals.css to avoid Tailwind purge issues
    },
  },
  plugins: [addVariablesForColors],
}

// Expose every Tailwind color as a CSS variable: var(--blue-500), etc.
function addVariablesForColors({ addBase, theme }: { addBase: (base: Record<string, Record<string, string>>) => void; theme: (path: string) => Record<string, string> }) {
  const allColors = flattenColorPalette(theme('colors')) as Record<string, string>
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )
  addBase({ ':root': newVars })
}

export default config
