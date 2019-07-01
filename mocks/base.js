const { Feature } = require("@xbyorange/mocks-server");

const { getAccessoriesEmpty, getAccessoriesSuccess } = require("./fixtures/accessories/get");
const { getConfigSuccess } = require("./fixtures/config/get");

const base = new Feature([getAccessoriesSuccess, getConfigSuccess]);

const noAccessories = base.extend([getAccessoriesEmpty]);

module.exports = {
  base,
  noAccessories
};
