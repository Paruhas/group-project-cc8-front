module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      primary: "#EDD1B0",
      secondary: "#AAAAAA",
      danger: "#FF0000",
    }),
    extend: {
      lineHeight: {
        "line-middle": "0.1em",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
