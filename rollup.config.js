const path = require("path");
const globule = require("globule");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const sass = require("rollup-plugin-sass");
const { flatten, compact } = require("lodash");

const packageJson = require("./package.json");

const srcBase = path.resolve(__dirname, "src");

const externalDependencies = Object.keys(packageJson.peerDependencies).concat(
  Object.keys(packageJson.dependencies)
);

const elementsTypes = globule.find("*", { srcBase });

const getElementsOfType = type => {
  return globule.find(`*`, {
    srcBase: path.resolve(srcBase, type)
  });
};

const getIndexFilesOfType = type => {
  return getElementsOfType(type).reduce((allElements, element) => {
    allElements[element] = `src/${type}/${element}/index.js`;
    return allElements;
  }, {});
};

const getOtherTypesAbsolutePaths = mainFolder => {
  return compact(
    flatten(
      elementsTypes.map(type => {
        if (type !== mainFolder) {
          return getElementsOfType(type).map(element => {
            return path.resolve(__dirname, "src", type, element);
          });
        }
      })
    )
  );
};

const getOtherTypesRelativePaths = absolutePaths => {
  return absolutePaths.reduce((allPaths, currentPath) => {
    const splitted = currentPath.split("/");
    allPaths[currentPath] = `../${splitted[splitted.length - 2]}/${
      splitted[splitted.length - 1]
    }.js`;
    return allPaths;
  }, {});
};

const IsExternalOrFromOtherType = otherTypesAbsolutePaths => (id, parentId) => {
  if (!parentId) {
    return false;
  }
  if (externalDependencies.includes(id)) {
    return true;
  }
  const splittedId = parentId.split("/");
  splittedId.splice(splittedId.length - 1, 1);
  const idPath = path.resolve(splittedId.join("/"), id);
  if (otherTypesAbsolutePaths.includes(idPath)) {
    return true;
  }
  return false;
};

const getTypeConfig = type => {
  const otherTypesAbsolutePaths = getOtherTypesAbsolutePaths(type);

  return {
    input: getIndexFilesOfType(type),
    external: IsExternalOrFromOtherType(otherTypesAbsolutePaths),
    output: {
      dir: type,
      format: "esm",
      paths: getOtherTypesRelativePaths(otherTypesAbsolutePaths)
    },
    plugins: [
      resolve({
        module: true,
        main: true,
        browser: true,
        jsnext: true,
        preferBuiltins: true
      }),
      commonjs({
        include: "node_modules/**"
      }),
      babel({
        exclude: "node_modules/**"
      }),
      sass()
    ]
  };
};

module.exports = elementsTypes.map(getTypeConfig);
