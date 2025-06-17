/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',   // ← make sure this globs ALL of your split‐out components
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  