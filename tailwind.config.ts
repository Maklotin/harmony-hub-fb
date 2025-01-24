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
        darkPurple: "#22162B",
        ultraViolet: "#724E91",
        saffron: "#F8C630",
        blush: "#E54F6D",
        emerald: "#06D6A0",
        darkForest: "#1B3022",
      },
      boxShadow: {
        primaryButton: "4px 4px 0px",
        primaryButtonHover: "6px 6px 0px -2px",
        blackNoFade: "4px 4px 0px black",
        imgShadow: "8px 8px 0px",
      },
      dropShadow: {
        buttonText1: "1px 1px rgba(229, 79, 109, 0.25)",
        buttonText2: "2px 2px rgba(229, 79, 109, 0.25)",
        textShadow2: "2px 2px rgb(229, 79, 109)",
        textShadow4: "4px 4px rgb(229, 79, 109)",
        textShadowHover: "6px 6px 0px -2px rgb(229, 79, 109)",
      },
    },
  },
  plugins: [],
} satisfies Config;
