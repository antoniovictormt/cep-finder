/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.tsx", "./src/**/*.tsx"],
  theme: {
    extend: {
      keyframes: {
        flip: {
          '0%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        }
      },
      animation: {
        'flip': 'flip 2s',
      },
    },
  },
  plugins: [],
}
