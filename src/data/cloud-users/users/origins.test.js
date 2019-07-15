import sinon from "sinon";

import { socket } from "data/socket";

import { cloudUserModels, cloudUserMe } from "./origins";

import { byIdQuery } from "helpers/api";

describe("cloudUserModels origin", () => {
  describe("byId customQuery", () => {
    it("should return byIdQuery", () => {
      expect(cloudUserModels.customQueries.byId).toEqual(byIdQuery);
    });
  });

  describe("listeners", () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      sandbox.spy(cloudUserMe, "clean");
      sandbox.spy(cloudUserModels.byId("foo"), "clean");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should clean cloudUserModel and cleanUserMe when socket cloudUser:updated event is received", () => {
      socket._trigger("cloudUser:updated", {
        _id: "foo"
      });
      expect(cloudUserMe.clean.callCount).toEqual(1);
      expect(cloudUserModels.byId("foo").clean.callCount).toEqual(1);
    });

    it("should clean cloudUserModel and cleanUserMe when socket cloudUser:deleted event is received", () => {
      socket._trigger("cloudUser:deleted", {
        _id: "foo"
      });
      expect(cloudUserMe.clean.callCount).toEqual(1);
      expect(cloudUserModels.byId("foo").clean.callCount).toEqual(1);
    });
  });
});
