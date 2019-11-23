import sinon from "sinon";
import { sources } from "@data-provider/core";
import { socket } from "data/socket";
import { byIdQuery } from "helpers/api";
import { serviceModels } from "./origins";

describe("serviceModels origin", () => {
  describe("byId customQuery", () => {
    it("should return byIdQuery query", () => {
      expect(serviceModels.customQueries.byId("foo-id")).toEqual(byIdQuery("foo-id"));
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

    it("should clean controller based origin filtered by received controller and ability id when socket service:updated event is received", () => {
      const FOO_ID = "foo-id";
      const FOO_CONTROLER = "foo-controller";
      const controllerBasedOrigin = sources
        .getById("/controllers/:controllerId/services/:id")
        .elements[0].queryAddingController({
          query: byIdQuery(FOO_ID),
          controller: FOO_CONTROLER
        });
      sandbox.spy(controllerBasedOrigin, "clean");

      socket._trigger("service:updated", {
        _id: FOO_ID,
        _controller: FOO_CONTROLER
      });
      expect(controllerBasedOrigin.clean.callCount).toEqual(1);
    });

    it("should clean origin queried by emitted id when socket service:updated event is received", () => {
      const FOO_ID = "foo-id";
      const origin = sources.getById("/services/:id").elements[0].query(byIdQuery(FOO_ID));
      sandbox.spy(origin, "clean");

      socket._trigger("service:updated", {
        _id: FOO_ID
      });
      expect(origin.clean.callCount).toEqual(1);
    });
  });
});
