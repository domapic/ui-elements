const { Feature } = require("@xbyorange/mocks-server");

const { getAccessoriesEmpty, getAccessoriesSuccess } = require("./fixtures/accessories/get");

const base = new Feature([getAccessoriesSuccess]);

const noAccessories = base.extend([getAccessoriesEmpty]);

module.exports = {
  base,
  noAccessories
};
