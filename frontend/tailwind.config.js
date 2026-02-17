/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors  
        primary: {
          DEFAULT: 'hsl(356, 73%, 45%)',
          foreground: 'hsl(0, 0%, 100%)',
        },
        secondary: {
          DEFAULT: 'hsl(215, 25%, 20%)',
          foreground: 'hsl(210, 20%, 98%)',
        },
        accent: {
          DEFAULT: 'hsl(217, 91%, 60%)',
          foreground: 'hsl(0, 0%, 100%)',
        },
        background: 'hsl(216, 16%, 9%)',
        foreground: 'hsl(210, 20%, 98%)',
        card: {
          DEFAULT: 'hsl(216, 16%, 12%)',
          foreground: 'hsl(210, 20%, 98%)',
        },
        muted: {
          DEFAULT: 'hsl(216, 16%, 16%)',
          foreground: 'hsl(215, 10%, 60%)',
        },
        border: 'hsl(216, 16%, 20%)',
        ring: 'hsl(356, 73%, 45%)',
        // Status Colors
        success: 'hsl(142, 71%, 45%)',
        warning: 'hsl(38, 92%, 50%)',
        error: 'hsl(0, 84%, 60%)',
        info: 'hsl(217, 91%, 60%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
