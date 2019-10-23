import sinon from "sinon";
import { sources } from "@xbyorange/mercury";
import { socket } from "data/socket";
import { userModels } from "./origins";
import { byIdQuery } from "helpers/api";

describe("userModels origin", () => {
  describe("byId customQuery", () => {
    it("should return id query string", () => {
      expect(userModels.customQueries.byId("foo-id")).toEqual({
        urlParams: {
          id: "foo-id"
        }
      });
    });
  });

  describe("listeners", () => {
    const FOO_ID = "foo-id";
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should clean controller based origin when socket user:updated event is received", () => {
      const controllerBasedOrigin = sources
        .getById("/controllers/:controllerId/users/:id")
        .elements[0].query(byIdQuery(FOO_ID));
      sandbox.spy(controllerBasedOrigin, "clean");

      socket._trigger("user:updated", {
        _id: FOO_ID
      });
      expect(controllerBasedOrigin.clean.callCount).toEqual(1);
    });

    it("should clean origin when socket user:deleted event is received", () => {
      const origin = sources.getById("/users/:id").elements[0].query(byIdQuery(FOO_ID));
      sandbox.spy(origin, "clean");

      socket._trigger("user:deleted", {
        _id: FOO_ID
      });
      expect(origin.clean.callCount).toEqual(1);
    });
  });
});
