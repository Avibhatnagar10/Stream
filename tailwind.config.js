// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",  // Add this line
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",  // Add this line to include files in the app directory
  ],
  theme: {
    extend: {
      keyframes: {
        jump7456: {
          '15%': { 'border-bottom-right-radius': '3px' },
          '25%': { transform: 'translateY(9px) rotate(22.5deg)' },
          '50%': { transform: 'translateY(18px) scale(1, .9) rotate(45deg)', 'border-bottom-right-radius': '40px' },
          '75%': { transform: 'translateY(9px) rotate(67.5deg)' },
          '100%': { transform: 'translateY(0) rotate(90deg)' },
        },
        shadow324: {
          '0%, 100%': { transform: 'scale(1, 1)' },
          '50%': { transform: 'scale(1.2, 1)' },
        },
      },
      animation: {
        jump7456: 'jump7456 0.5s linear infinite',
        shadow324: 'shadow324 0.5s linear infinite',
      },
    },
  },
  plugins: [],
};



