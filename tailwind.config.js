/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#18171F",
        dark: "#24232C",
        gray: "817D92",
        light: "#E6E5EA",
        neon: "#A4FFAF",
        red: "#F64A4A",
        orange: "#F87C58",
        yellow: "#F8C465",
      },
    },
  },
  plugins: [],
};
