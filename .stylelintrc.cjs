module.exports = {
  customSyntax: "postcss-scss",
  extends: [
    "stylelint-config-airbnb",
    "stylelint-config-rational-order",
    "stylelint-prettier/recommended",
    "stylelint-config-prettier",
    "stylelint-config-standard-scss"
  ],
  plugins: ["stylelint-order", "stylelint-scss"],
  rules: {
    "scss/dollar-variable-pattern": null,
    "declaration-property-value-blacklist": null
  }
};