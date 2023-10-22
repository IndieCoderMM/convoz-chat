/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "19.5px"],
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["28px", "50px"],
      "4xl": ["48px", "58px"],
      "8xl": ["96px", "106px"],
    },
    extend: {
      fontFamily: {
        noto: ["Noto Sans", "sans-serif"],
      },

      colors: {
        primary: "#5865F2",
        secondary: "#1cb17d",
        dark: {
          100: "#8E9297",
          200: "#72767D",
          300: "#4F545C",
          400: "#36393F",
          500: "#4E5058",
          600: "#383A40",
          700: "#313338",
          800: "#2B2D31",
          900: "#1E1F22",
        },
        light: "#B5BAC1",
        white: "#F2F3F5",
      },
      boxShadow: {
        "3xl": "0 10px 40px rgba(0, 0, 0, 0.1)",
      },
      screens: {
        wide: "1440px",
      },
      backgroundImage: {
        header: "url('/img/header_illustration.svg')",
      },
    },
  },
  plugins: [],
};
