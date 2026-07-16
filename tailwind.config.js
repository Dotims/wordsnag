/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366F1",
          dark: "#4F46E5",
          tint: "#EEF0FF",
        },
        ink: "#18181B",
        muted: "#71717A",
        surface: "#FAFAFB",
        line: "#ECECEF",
      },
    },
  },
  plugins: [],
};
