/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'left-right': {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(20px)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'left-right': 'left-right 2s ease-in-out infinite',
        'Aspin-slow': 'spin 10s linear infinite',
      },
      colors: {
        primary: '#f7931e',
        // Define colors using hex values to avoid oklch issues
        secondary: '#1e293b',
        accent: '#22c55e',
        neutral: '#3d4451',
        info: '#3abff8',
        success: '#36d399',
        warning: '#fbbd23',
        error: '#f87272',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#f7931e",     // Using hex instead of oklch
          "secondary": "#1e293b",   // Using hex instead of oklch
          "accent": "#22c55e",      // Using hex instead of oklch
          "neutral": "#3d4451",     // Using hex instead of oklch
          "base-100": "#ffffff",    // Using hex instead of oklch
          "info": "#3abff8",        // Using hex instead of oklch
          "success": "#36d399",     // Using hex instead of oklch
          "warning": "#fbbd23",     // Using hex instead of oklch
          "error": "#f87272",       // Using hex instead of oklch
        },
      },
    ],
  },
}