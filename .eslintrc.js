module.exports = {
  extends: ["react-app", "plugin:jsx-a11y/recommended"],
  plugins: ["jsx-a11y"],
  rules: {
    "import/no-anonymous-default-export": "error",

    /**
     * React does not have to be in scope with Next.js
     */
    "react/react-in-jsx-scope": "off",

    /**
     * `next/link` puts the href on the `<Link>` tag instead of the `<a>` tag.
     */
    "jsx-a11y/anchor-is-valid": "off",

    /**
     * This rule is deprecated and does not apply to modern browsers, which
     * we are targeting here.
     */
    "jsx-a11y/no-onchange": "off",
  },
};
