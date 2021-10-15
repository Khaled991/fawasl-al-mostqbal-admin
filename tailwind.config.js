module.exports = {
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#308d62',
        darkColor: '#1f2937',
      },
      lineHeight: {
        xl: "70px",
        lg: "50px",
      },
      zIndex: {
        "-10": "-10",
      },
      fontSize: {
        '4-5xl': '2.5rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
