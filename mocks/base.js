const { Feature } = require("@mocks-server/main");

const { getConfig, getConfigNoCustom, getConfigError } = require("./fixtures/config/get");

const base = new Feature([getConfig]);

const error = base.extend([getConfigError]);

const configNoCustom = base.extend([getConfigNoCustom]);

module.exports = {
  base,
  configNoCustom,
  error
};
