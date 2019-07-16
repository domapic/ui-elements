module.exports = {
  plugins: [
    "stylelint-declaration-use-variable",
    "stylelint-scss"
  ],
  ignoreFiles: "**/*.js",
  extends: ["stylelint-config-sass-guidelines"],
  rules: {
    "color-hex-length": "long",
    "color-hex-case": "upper",
    "comment-whitespace-inside": "always",
    "declaration-no-important": true,
    "declaration-block-no-duplicate-properties": true,
    "no-extra-semicolons": true,
    "no-missing-end-of-source-newline": null,
    "max-nesting-depth": 5,
    "selector-class-pattern": [
      "^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:\\[.+\\])?$",
      {
        resolveNestedSelectors: true
      }
    ],
    "string-quotes": "double",
    "order/properties-alphabetical-order": null,
    "order/order": null,
    "sh-waqar/declaration-use-variable": [["background", "/color/"]],
    "scss/at-extend-no-missing-placeholder": null,
    "scss/at-import-no-partial-leading-underscore": null,
    "scss/at-mixin-pattern": null,
    "scss/dollar-variable-pattern": ".*"
  }
};
