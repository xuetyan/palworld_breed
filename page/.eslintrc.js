module.exports = {
  root: true,
  env: {
    node: true,
    "vue/setup-compiler-macros": true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "generator-star-spacing": "off",
    "no-tabs": "off",
    "no-unused-vars": "off",
    "no-irregular-whitespace": "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-var-requires": 0,
    "vue/multi-word-component-names": "off",
    "vue/no-v-for-template-key": "off",
    "vue/no-v-model-argument": "off",
  }
}