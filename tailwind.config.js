const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
	purge: {
		content: [
			"./pages/**/*.{js,ts,jsx,tsx}",
			"./components/**/*.{js,ts,jsx,tsx}",
		],
		options: {
			safelist: [/^\.bg-[a-z]+?-500$/],
		},
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				rose: colors.rose,
				orange: colors.orange,
				yellow: colors.yellow,
				green: colors.green,
				teal: colors.teal,
				ingido: colors.indigo,
				purple: colors.purple,
				pink: colors.pink,
			},
		},
	},
	variants: {
		extend: {
			opacity: ["disabled"],
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
