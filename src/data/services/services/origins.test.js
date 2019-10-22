import sinon from "sinon";
import { sources } from "@xbyorange/mercury";
import { socket } from "data/socket";
import { servicesCollection } from "./origins";

describe("servicesCollection origin", () => {
  describe("type customQuery", () => {
    it("should return type query string", () => {
      expect(servicesCollection.customQueries.type("foo-type")).toEqual({
        queryString: {
          type: "foo-type"
        }
      });
    });

    it("should return undefined if no type is provided", () => {
      expect(servicesCollection.customQueries.type()).toEqual(undefined);
    });
  });

  describe("listeners", () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should clean controller based origin when socket service:created event is received", () => {
      const controllerBasedOrigin = sources.getById("/controllers/:controllerId/services")
        .elements[0];
      sandbox.spy(controllerBasedOrigin, "clean");

      socket._trigger("service:created");
      expect(controllerBasedOrigin.clean.callCount).toEqual(1);
    });

    it("should clean origin when socket service:updated event is received", () => {
      const origin = sources.getById("/services").elements[0];
      sandbox.spy(origin, "clean");

      socket._trigger("service:updated");
      expect(origin.clean.callCount).toEqual(1);
    });
  });
});
