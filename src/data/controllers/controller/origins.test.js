import sinon from "sinon";

import { socket } from "data/socket";

import { controllerModels, controllerApiKey, selectedController } from "./origins";

import { byIdQuery } from "helpers/api";

describe("controllerModels origin", () => {
  describe("byId customQuery", () => {
    it("should return byIdQuery", () => {
      expect(controllerModels.customQueries.byId).toEqual(byIdQuery);
    });
  });

  describe("socket listeners", () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      sandbox.spy(controllerModels.byId("foo"), "clean");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should clean controllerModels queried by received id when socket controller:updated event is received", () => {
      socket._trigger("controller:updated", {
        _id: "foo"
      });
      expect(controllerModels.byId("foo").clean.callCount).toEqual(1);
    });
  });
});

describe("controllerApiKey origin", () => {
  describe("byId customQuery", () => {
    it("should return byIdQuery", () => {
      expect(controllerApiKey.customQueries.byId).toEqual(byIdQuery);
    });
  });
});

describe("selectedController origin", () => {
  describe("id customQuery", () => {
    it("should return id key", () => {
      expect(selectedController.customQueries.id()).toEqual("id");
    });
  });

  describe("isRequired customQuery", () => {
    it("should return id key", () => {
      expect(selectedController.customQueries.isRequired()).toEqual("required");
    });
  });
});
