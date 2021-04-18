module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base"
  ],
  ignorePatterns: ["build", ".*.js", "*.config.js", "node_modules"],
  rules: {
    "indent": [2],
    "semi": [
      "error",
      "never"
    ],
    "no-shadow": "off",
    "no-unused-vars": "off",
    "import/no-unresolved": "off",
    "no-underscore-dangle": "off",
    "no-useless-constructor": "off",
    "no-undef": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-shadow": "error",
    "import/extensions": ["off"],
  },
};