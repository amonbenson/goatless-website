import antfu from "@antfu/eslint-config";

export default antfu({
  formatters: {
    css: true,
    html: true
  },
  stylistic: {
    indent: 2,
    quotes: "double",
    semi: true
  },
  typescript: true,
  vue: true,
  ignores: [
    "client-next"
  ]
}, {
  ignores: [
    "client-next"
  ],
  rules: {
    "style/comma-dangle": ["error", "never"],
    "no-console": ["warn", { allow: ["warn", "error"] }]
  }
});
