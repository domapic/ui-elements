const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const aliasImporter = require("node-sass-alias-importer");

module.exports = async ({ config /*, mode*/ }) => {
  config.module.rules.push(
    {
      test: /\.scss$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            modules: {
              localIdentName: `[local]___${new Date().getTime()}__[hash:base64:5]`
            }
          }
        },
        "postcss-loader",
        {
          loader: "sass-loader",
          options: {
            importer: aliasImporter({
              theme: `./src/themes/base/index`
            })
          }
        }
      ],
      include: path.resolve(__dirname, "..")
    },
    {
      test: /\.stories\.js?$/,
      loaders: [require.resolve("@storybook/addon-storysource/loader")],
      enforce: "pre"
    }
  );

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
      },
      {
        from: "**",
        to: ".",
        context: "static"
      }
    ])
  );

  return config;
};
