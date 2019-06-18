const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const aliasImporter = require("node-sass-alias-importer");

// Export a function. Accept the base config as the only param.
module.exports = async ({ config /*, mode*/ }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      "style-loader",
      "css-loader",
      {
        loader: "sass-loader",
        options: {
          importer: aliasImporter({
            theme: "./src/themes/base/index"
          })
        }
      }
    ],
    include: path.resolve(__dirname, "..", "src")
  });

  config.module.rules.push({
    test: /\.stories\.js?$/,
    loaders: [require.resolve("@storybook/addon-storysource/loader")],
    enforce: "pre"
  });

  config.plugins.push(
    new CopyWebpackPlugin([
      {
        from: "**",
        to: "semantic/themes",
        context: "node_modules/semantic-ui-css/themes"
      },
      {
        from: "semantic.min.css",
        to: "semantic/semantic.min.css",
        context: "node_modules/semantic-ui-css"
      }
    ])
  );

  // Return the altered config
  return config;
};
