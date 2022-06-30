module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    // 'standard',
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    'prettier'
  ],
  plugins: [
      "@typescript-eslint"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: 'module',
    project: "./tsconfig.json"
  },
  rules: {
  }
}
