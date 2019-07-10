// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["src/**", "!src/**/index.js", "!src/**/*.stories.js"],
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  // The glob patterns Jest uses to detect test files
  testMatch: ["**/?(*.)+(spec|test).js?(x)"],

  transform: {
    ".js$": "babel-jest",
    "^.+\\.scss$": "<rootDir>/config/tests/cssTransform.js"
  },

  setupFiles: ["<rootDir>/config/tests/init.js"],
  setupFilesAfterEnv: ["<rootDir>/config/tests/setup.js", "jest-prop-type-error"]
};
