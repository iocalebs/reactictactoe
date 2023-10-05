import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			keyframes: {
				"fade-in": {
					from: { opacity: "0" },
				},
			},
			animation: {
				"fade-in": "fade-in 0.5s cubic-bezier(0.4, 0, 0.6, 1)",
			},
		},
	},
	plugins: [],
};
export default config;
