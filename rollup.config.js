const path = require("path");

const globule = require("globule");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const sassPlugin = require("rollup-plugin-sass");
const { flatten, compact, difference } = require("lodash");
const sass = require("node-sass");
const fsExtra = require("fs-extra");

const packageJson = require("./package.json");

const importAlias = require("./sassImportAlias");

const srcBase = path.resolve(__dirname, "src");

const OMMITED_ELEMENTS = ["themes"];

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
      sassPlugin({
        insert: true,
        output: styles => {
          const filePath = path.resolve(__dirname, type, `${name}.css`);
          fsExtra.writeFile(filePath, styles, "utf8").then(() => {
            console.log(`created ${filePath}`);
          });
        },
        runtime: sass,
        options: {
          importer: importAlias({
            theme: "./src/themes/base/index"
          })
        }
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
