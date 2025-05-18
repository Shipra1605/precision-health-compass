
import type { Config } from "tailwindcss";

export default {
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))', // Pearl Gray family
				foreground: 'hsl(var(--foreground))', // Navy Blue family
				primary: {
					DEFAULT: 'hsl(var(--primary))', // Teal / Deep Sky Blue
					foreground: 'hsl(var(--primary-foreground))' // White
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))', // Lighter Teal or Accent Blue
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))', // Could be a pastel accent
					foreground: 'hsl(var(--accent-foreground))'
				},
        popover: { // ... keep existing code
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: { // ... keep existing code
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: { // ... keep existing code
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors based on user request
				'brand-teal': '#0EA5E9', // Deep Sky Blue / Teal
				'brand-teal-dark': '#0FA0CE',
				'brand-blue-sky': '#33C3F0',
				'brand-pearl-gray': '#F1F1F1', // Backgrounds
				'brand-pearl-gray-light': '#F6F6F7',
				'brand-navy': '#222635', // Headings / Dark Text (was #221F26, adjusted for better foreground)
				'brand-navy-light': '#333A4C',
				// Pastel accents
				'pastel-purple': '#E5DEFF',
				'pastel-blue': '#D3E4FD',
			},
			borderRadius: { // ... keep existing code
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: { // ... keep existing code
				sans: ['Inter', 'sans-serif'],
				heading: ['Montserrat', 'sans-serif'],
				raleway: ['Raleway', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
			},
			keyframes: { // ... keep existing code
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				}
			},
			animation: { // ... keep existing code
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
