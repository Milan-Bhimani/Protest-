/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A2E',
        red: '#D32F2F',
        gold: '#F5C518',
        background: '#FFFDF5',
        surface: '#FFFFFF',
        border: '#E8D5A3',
        text: '#1A1A2E',
        muted: '#8D7B50',
        blue: '#1565C0',
        success: '#16A34A',
        warning: '#D97706',
        error: '#DC2626',
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}
