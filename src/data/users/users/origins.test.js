import sinon from "sinon";
import { sources } from "@data-provider/core";
import { socket } from "data/socket";

import { userModels } from "../user/origins";
import { userMe } from "../me/origins";
import "./origins";

describe("usersCollection origin", () => {
  describe("socket listeners", () => {
    const FOO_ID = "foo-id";
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should clean controller based origin when socket user:updated event is received", () => {
      const controllerBasedOrigin = sources.getById("/controllers/:controllerId/users")
        .elements[0];
      sandbox.spy(controllerBasedOrigin, "clean");

      socket._trigger("user:updated", {
        _id: FOO_ID
      });
      expect(controllerBasedOrigin.clean.callCount).toEqual(1);
    });

    it("should clean origin when socket user:deleted event is received", () => {
      const origin = sources.getById("/users").elements[0];
      sandbox.spy(origin, "clean");

      socket._trigger("user:deleted", {
        _id: FOO_ID
      });
      expect(origin.clean.callCount).toEqual(1);
    });
  });

  describe("userModels listeners", () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      sandbox.stub(sources.getById("/users/:id").elements[0], "client").resolves({});
      sandbox.spy(userMe, "clean");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should clean userMe when a userModel is deleted", async () => {
      expect.assertions(1);
      await userModels.byId("foo").delete();
      expect(userMe.clean.callCount).toEqual(1);
    });

    it("should clean controller based origin when a userModel is deleted", async () => {
      const controllerBasedOrigin = sources.getById("/controllers/:controllerId/users")
        .elements[0];
      sandbox.spy(controllerBasedOrigin, "clean");

      await userModels.byId("foo").delete();
      expect(controllerBasedOrigin.clean.callCount).toEqual(1);
    });

    it("should clean origin when a userModel is updated", async () => {
      const origin = sources.getById("/users").elements[0];
      sandbox.spy(origin, "clean");

      await userModels.byId("foo").update();
      expect(origin.clean.callCount).toEqual(1);
    });
  });
});
