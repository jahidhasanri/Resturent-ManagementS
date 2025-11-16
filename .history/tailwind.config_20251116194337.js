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

        /* 🔥 RGB Border Animation */
        'rgb-border': {
          '0%': { borderColor: 'rgb(255,0,0)' },
          '33%': { borderColor: 'rgb(0,255,0)' },
          '66%': { borderColor: 'rgb(0,0,255)' },
          '100%': { borderColor: 'rgb(255,0,0)' },
        },
      },

      animation: {
        float: 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'left-right': 'left-right 2s ease-in-out infinite',
        'Aspin-slow': 'spin 10s linear infinite',

        /* 🔥 RGB Border Animation */
        "rgb-border": "rgb-border 3s linear infinite",
      },

      colors: {
        primary: '#f7931e',
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
          primary: "#f7931e",
          secondary: "#1e293b",
          accent: "#22c55e",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
    styled: true,
    base: true,
    utils: true,
    logs: false,
  },
}
