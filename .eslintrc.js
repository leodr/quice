module.exports = {
	extends: ["react-app", "plugin:jsx-a11y/recommended"],
	plugins: ["jsx-a11y"],
	rules: {
		"import/no-anonymous-default-export": "error",
		"react/react-in-jsx-scope": "off", // React is always in scope with Next.js
		"jsx-a11y/anchor-is-valid": "off", //Doesn't play well with Next <Link> usage
	},
};
