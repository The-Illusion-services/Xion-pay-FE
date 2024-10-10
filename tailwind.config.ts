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
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        'lg': '1034px',
        // => @media (min-width: 992px) { ... }
      },
      backgroundImage: {
        "easing-gradient":
          "linear-gradient(to bottom, #0d0f11, #121418, #191c20, #191b1f)",
      },
      colors: {
        "row-hover": "#333",
        "primary-forest-green": "#212A08",
        "primary-green": "#A7D129",
        "primary-orange": "#F07000",
        "primary-dark": "#191919",
        "secondary-border": "#A5A5A5",
        "secondary-transparent-border": "#616161",
        "status-cancelled": "#1F0501",
        "text-cancelled": "#EB5033",
        "status-pending" : "#544A01",
        "text-pending" : "#FFE525",
        "status-completed" :"#094301",
        "text-completed" :"#41C82E",
        "secondary-dark": "#262525",
        "secondary-darker": "#201f1f",
        "primary-border": "#616161",
        "black-primary": "#020204",
        "black-secondary": "#7f8ea3",
        "black-container": "#030711",
        "item-active": "#0e1629",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
