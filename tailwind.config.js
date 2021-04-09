const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}", "./tailwind-safelist"],
  darkMode: false,
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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              backgroundColor: theme("colors.gray.100"),
            },
            code: {
              backgroundColor: theme("colors.gray.100"),
              borderRadius: theme("borderRadius.md"),
              padding: `${theme("padding.1")} ${theme("padding.px")}`,
              color: theme("colors.pink.600"),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
