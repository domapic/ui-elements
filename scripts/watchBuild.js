const path = require("path");
const chokidar = require("chokidar");
const npmRun = require("npm-run");
const { trim } = require("lodash");

const watcher = chokidar.watch(["src/**/*", "rollup.config.js"]);

let building = false;
let pendingBuild = false;

const logBuild = data => {
  const cleanData = trim(data);
  if (cleanData.length) {
    console.log(cleanData);
  }
};

const runBuild = () => {
  if (!building) {
    pendingBuild = false;
    const child = npmRun.spawn("rollup", ["--config"], {
      env: {
        FORCE_COLOR: true,
        COLORS: true
      },
      cwd: path.resolve(__dirname, "..")
    });
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", logBuild);
    child.stderr.on("data", logBuild);
    child.on("exit", () => {
      if (pendingBuild) {
        building = false;
        runBuild();
      }
    });
  } else {
    pendingBuild = true;
  }
};

watcher.on("change", () => runBuild());
runBuild();
