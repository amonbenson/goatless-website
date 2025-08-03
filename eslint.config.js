import pluginVue from "eslint-plugin-vue";

export default [
  ...pluginVue.configs["flat/recommended"],
  {
    rules: {
      "indent": ["error", 2],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "no-console": "warn",
      "no-unused-vars": "error",
      "vue/component-tags-order": ["error", {
        order: ["script", "template", "style"],
      }],
      "vue/multi-word-component-names": "off",
    },
  },
];
