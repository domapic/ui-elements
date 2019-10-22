import sinon from "sinon";
import { sources } from "@xbyorange/mercury";
import { socket } from "data/socket";

import { countLogs } from "./origins";

const waitForEvent = () =>
  new Promise(resolve => {
    setTimeout(() => resolve(), 6000);
  });

describe("logs origin", () => {
  describe("listeners", () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should clean origin and controller based origin when socket log:created event is received", () => {
      //jest.setTimeout(10000);
      expect.assertions(2);
      const controllerBasedOrigin = sources.getById("/controllers/:controllerId/logs").elements[0];
      const origin = sources.getById("/logs").elements[0];
      sandbox.spy(origin, "clean");
      sandbox.spy(controllerBasedOrigin, "clean");

      socket._trigger("log:created");
      //await waitForEvent();
      expect(controllerBasedOrigin.clean.callCount).toEqual(1);
      expect(origin.clean.callCount).toEqual(1);
    });

    it("should not clean origin and controller based origin again until 5000 miliseconds pass", async () => {
      jest.setTimeout(10000);
      expect.assertions(2);
      const controllerBasedOrigin = sources.getById("/controllers/:controllerId/logs").elements[0];
      const origin = sources.getById("/logs").elements[0];
      sandbox.spy(origin, "clean");
      sandbox.spy(controllerBasedOrigin, "clean");

      await waitForEvent();
      socket._trigger("log:created");
      socket._trigger("log:created");
      socket._trigger("log:created");
      expect(controllerBasedOrigin.clean.callCount).toEqual(1);
      expect(origin.clean.callCount).toEqual(1);
    });
  });
});

describe("countlogs origin", () => {
  describe("listeners", () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should clean origin and controller based origin when socket log:created event is received", async () => {
      jest.setTimeout(10000);
      expect.assertions(2);
      const controllerBasedOrigin = sources.getById("/controllers/:controllerId/logs/stats")
        .elements[0];
      const origin = sources.getById("/logs/stats").elements[0];
      sandbox.spy(origin, "clean");
      sandbox.spy(controllerBasedOrigin, "clean");
      socket._trigger("log:created");
      await waitForEvent();
      expect(controllerBasedOrigin.clean.callCount).toEqual(1);
      expect(origin.clean.callCount).toEqual(1);
    });
  });

  describe("ofAbility customQuery", () => {
    it("should return ability query string", () => {
      expect(countLogs.customQueries.ofAbility("foo-ability")).toEqual({
        queryString: {
          ability: "foo-ability"
        }
      });
    });
  });
});
