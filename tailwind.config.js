/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    colors: {
      "transparent": "transparent",
      "current": "currentColor",
      "inherit": "inherit",
      "background": "rgb(var(--background-rgb) / <alpha-value>)",
      "background-shade": "rgb(var(--background-shade-rgb) / <alpha-value>)",
      "foreground": "rgb(var(--foreground-rgb) / <alpha-value>)",
      "foreground-weak": "rgb(var(--foreground-weak-rgb) / <alpha-value>)",
      "accent": "rgb(var(--accent-rgb) / <alpha-value>)",
      "accent-lighter": "rgb(var(--accent-lighter-rgb) / <alpha-value>)",
      "accent-text": "rgb(var(--accent-text-rgb) / <alpha-value>)"
    },
    extend: {
      zIndex: {
        "min": -99999,
        "backdrop": -100,
        "overlay": 1000,
        "header": 1001,
        "footer": 1001,
        "overlay-screen": 1002,
        "max": 99999
      },
      transitionDuration: {
        DEFAULT: "200ms"
      },
      transitionTimingFunction: {
        DEFAULT: "ease-in-out"
      }
    }
  },
  plugins: []
};
