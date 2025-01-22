import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Audiowide", "cursive"],
      },
      colors: {
        primary: "#0F0326",
        bPrimary: "#451F55",
        saffron: "#F8C630",
        blush: "#E54F6D",
      },
      boxShadow: {
        primaryButton: "4px 4px 0px !important",
      },
      dropShadow: {
        buttonText1: "1px 1px rgba(229, 79, 109, 0.25)",
        buttonText2: "2px 2px rgba(229, 79, 109, 0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
