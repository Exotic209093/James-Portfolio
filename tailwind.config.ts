import type { Config } from 'tailwindcss'

// The house colour is a quiet lavender (#b8a7f2). The purple and primary scales
// are remapped onto it so existing utility classes inherit the calmer palette.
const lavender = {
  50: '#f5f3fd',
  100: '#ebe7fb',
  200: '#d9d1f7',
  300: '#c8bcf5',
  400: '#b8a7f2',
  500: '#9d8ae0',
  600: '#8270c4',
  700: '#6a5aa3',
  800: '#4a4070',
  900: '#2e2a45',
  950: '#1c1a2a',
}

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // One content width everywhere: the container stops growing at 1280px so
    // the header, homepage sections and inner pages share the same left edge.
    container: {
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
    },
    extend: {
      colors: {
        background: '#0d0e12',
        foreground: '#eceaf3',
        ink: {
          DEFAULT: '#0d0e12',
          raised: '#15171d',
          deep: '#08090c',
        },
        paper: '#eceaf3',
        muted: '#a6a4b5',
        line: '#2a2d38',
        house: '#b8a7f2',
        primary: lavender,
        purple: {
          ...lavender,
          dark: '#15171d',
          deep: '#08090c',
          accent: '#6a5aa3',
          light: '#b8a7f2',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
}
export default config
