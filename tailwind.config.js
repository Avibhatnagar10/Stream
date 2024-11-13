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
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",  // Add this line to include files in the app directory
  ],
  theme: {
  	extend: {
  		keyframes: {
  			jump7456: {
  				'15%': {
  					'border-bottom-right-radius': '3px'
  				},
  				'25%': {
  					transform: 'translateY(9px) rotate(22.5deg)'
  				},
  				'50%': {
  					transform: 'translateY(18px) scale(1, .9) rotate(45deg)',
  					'border-bottom-right-radius': '40px'
  				},
  				'75%': {
  					transform: 'translateY(9px) rotate(67.5deg)'
  				},
  				'100%': {
  					transform: 'translateY(0) rotate(90deg)'
  				}
  			},
  			shadow324: {
  				'0%, 100%': {
  					transform: 'scale(1, 1)'
  				},
  				'50%': {
  					transform: 'scale(1.2, 1)'
  				}
  			}
  		},
  		animation: {
  			jump7456: 'jump7456 0.5s linear infinite',
  			shadow324: 'shadow324 0.5s linear infinite'
  		},
  		fontFamily: {
  			poppins: ['Poppins', 'sans-serif'],
  			montserrat: ['Montserrat', 'sans-serif'],
  			oswald: ['Oswald', 'sans-serif']
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};



