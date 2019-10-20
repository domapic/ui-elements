import sinon from "sinon";
import { sources } from "@xbyorange/mercury";
import { socket } from "data/socket";
import { abilitiesCollection } from "./origins";

describe("abilitiesCollection origin", () => {
  describe("ofService customQuery", () => {
    it("should return service query string", () => {
      expect(abilitiesCollection.customQueries.ofService("foo-service")).toEqual({
        queryString: {
          service: "foo-service"
        }
      });
    });

    it("should return undefined if no service is provided", () => {
      expect(abilitiesCollection.customQueries.ofService()).toEqual(undefined);
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

    it("should clean controller based origin when socket ability:created event is received", () => {
      const controllerBasedOrigin = sources.getById("/controllers/:controllerId/abilities")
        .elements[0];
      sandbox.spy(controllerBasedOrigin, "clean");

      socket._trigger("ability:created");
      expect(controllerBasedOrigin.clean.callCount).toEqual(1);
    });

    it("should clean origin when socket ability:deleted event is received", () => {
      const origin = sources.getById("/abilities").elements[0];
      sandbox.spy(origin, "clean");

      socket._trigger("ability:deleted");
      expect(origin.clean.callCount).toEqual(1);
    });
  });
});
