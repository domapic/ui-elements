const path = require("path");

const globule = require("globule");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const postcss = require("rollup-plugin-postcss");
const { flatten, compact, difference } = require("lodash");
const sass = require("node-sass");
const autoprefixer = require("autoprefixer");

const packageJson = require("./package.json");

const aliasImporter = require("node-sass-alias-importer");

const srcBase = path.resolve(__dirname, "src");

const OMMITED_ELEMENTS = ["themes", "storybook"];

const externalDependencies = Object.keys(packageJson.peerDependencies).concat(
  Object.keys(packageJson.dependencies)
);

const elementsTypes = difference(globule.find("*", { srcBase }), OMMITED_ELEMENTS);

const getElementsOfType = type => {
  return globule.find(`*`, {
    srcBase: path.resolve(srcBase, type)
  });
};

const getOtherAbsolutePaths = (elementType, elementName) => {
  return compact(
    flatten(
      elementsTypes.map(type => {
        return getElementsOfType(type).map(name => {
          if (type === elementType && name === elementName) {
            return null;
          }
          return path.resolve(__dirname, "src", type, name);
        });
      })
    )
  );
};

const getOtherRelativePaths = absolutePaths => {
  return absolutePaths.reduce((allPaths, currentPath) => {
    const splitted = currentPath.split("/");
    allPaths[currentPath] = `../${splitted[splitted.length - 2]}/${
      splitted[splitted.length - 1]
    }.js`;
    return allPaths;
  }, {});
};

const IsExternal = otherAbsolutePaths => (id, parentId) => {
  if (!parentId) {
    return false;
  }
  if (externalDependencies.includes(id)) {
    return true;
  }
  const splittedId = parentId.split("/");
  splittedId.splice(splittedId.length - 1, 1);
  const idPath = path.resolve(splittedId.join("/"), id);
  if (otherAbsolutePaths.includes(idPath)) {
    return true;
  }
  return false;
};

const getElementConfig = (type, name) => {
  const otherAbsolutePaths = getOtherAbsolutePaths(type, name);

  return {
    input: `src/${type}/${name}/index.js`,
    external: IsExternal(otherAbsolutePaths),
    output: {
      file: `${type}/${name}.js`,
      format: "esm",
      paths: getOtherRelativePaths(otherAbsolutePaths)
    },
    plugins: [
      resolve({
        mainFields: ["module", "jsnext:main", "main"],
        preferBuiltins: true
      }),
      commonjs({
        include: "node_modules/**"
      }),
      babel({
        exclude: "node_modules/**"
      }),
      postcss({
        modules: {
          localIdentName: `[local]___${new Date().getTime()}__[hash:base64:5]`
        },
        minimize: true,
        plugins: [autoprefixer({})],
        use: ["sass-alias"],
        loaders: [
          {
            name: "sass-alias",
            test: /\.s[ac]ss$/,
            process: function() {
              return new Promise((resolve, reject) => {
                sass.render(
                  {
                    file: this.id,
                    importer: aliasImporter({
                      theme: `./src/themes/base/index`
                    })
                  },
                  (err, result) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve({
                        code: result.css.toString()
                      });
                    }
                  }
                );
              });
            }
          }
        ]
      })
    ]
  };
};

const getTypeConfig = type => {
  return getElementsOfType(type).map(elementName => getElementConfig(type, elementName));
};

const getElementsConfig = () => {
  return flatten(elementsTypes.map(getTypeConfig));
};

module.exports = getElementsConfig();
