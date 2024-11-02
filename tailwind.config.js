/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      dyna: ["DynaPuff"],
      tsuki: ["Nine Tsuki"],
      river: ["River Adventurer"],
    },
    extend: {
      backgroundImage: {
        texture: "url('src/assets/texture.png')",
      },
    },
  },
  plugins: [],
};
