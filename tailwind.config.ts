import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
      fontFamily: {
        rationalSemibold: ['"Rational Text DEMO SemiBold"', "sans-serif"],
        rationalLight: ['"Rational Text DEMO Light"', "sans-serif"],
      },
  		screens: {
  			lg: '1034px'
  		},
  		backgroundImage: {
  			'easing-gradient': 'linear-gradient(to bottom, #0d0f11, #121418, #191c20, #191b1f)'
  		},
  		colors: {
  			gray_primary: "#1A1A1A",
        
        white_primary: "#F2F2F2"
  			
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
