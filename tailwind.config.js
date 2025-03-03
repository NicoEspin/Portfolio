/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary1: "#854CE6",
        background1: "#222A35",
        background2:"#1F2937",
        background3: "#15191f",
        button: "#854CE6",
        background2: "#19212C",
        text: "#C8CFD8",
        text1: "#F2F5F7",
        text2: "#626970",
        text3: "#575C66",
        footerBackground: "#00012B",
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, hsla(262, 75%, 60%, 1) 0%, hsla(290, 56%, 56%, 1) 100%)',
      },
      boxShadow: {
        'custom-shadow': ' 1px -1px 17px 4px rgba(147, 51, 234, 0.5);',
        'card-shadow':'0px 4px 20px -4px rgba(59, 130, 246, 0.5);',
      }
    },
  },
  plugins: [],
};
