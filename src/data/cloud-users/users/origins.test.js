import sinon from "sinon";

import { socket } from "data/socket";

import { cloudUserModels, cloudUserMe } from "./origins";

import { byIdQuery } from "helpers/api";

const triggerSocketEvent = (eventName, eventData) => {
  let listeners = socket._listeners.filter(listener => {
    return listener.eventName === eventName;
  });
  listeners.forEach(listener => {
    listener.callback(eventData);
  });
};

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
      triggerSocketEvent("cloudUser:updated", {
        _id: "foo"
      });
      expect(cloudUserMe.clean.callCount).toEqual(1);
      expect(cloudUserModels.byId("foo").clean.callCount).toEqual(1);
    });

    it("should clean cloudUserModel and cleanUserMe when socket cloudUser:deleted event is received", () => {
      triggerSocketEvent("cloudUser:deleted", {
        _id: "foo"
      });
      expect(cloudUserMe.clean.callCount).toEqual(1);
      expect(cloudUserModels.byId("foo").clean.callCount).toEqual(1);
    });
  });
});
