// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{css}', // make sure your CSS is scanned for @apply
  ],
  theme: {
    extend: {
      colors: {
        brandYellow: '#fffe9e', // your custom color
      },
    },
  },
  plugins: [],
};