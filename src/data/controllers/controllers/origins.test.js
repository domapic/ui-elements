import sinon from "sinon";

import { socket } from "data/socket";

import { controllerModels } from "../controller/origins";

import { controllersCollection } from "./origins";

describe("controllersCollection origin", () => {
  describe("allowedUser customQuery", () => {
    it("should return query string containing user id", () => {
      expect(controllersCollection.customQueries.allowedUser("foo-user-id")).toEqual({
        queryString: {
          "allowed-user": "foo-user-id"
        }
      });
    });

    it("should return undefined if no user id is provided", () => {
      expect(controllersCollection.customQueries.allowedUser()).toEqual(undefined);
    });
  });

  describe("socket listeners", () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      sandbox.spy(controllersCollection, "clean");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should clean controllersCollection when socket controller:created event is received", () => {
      socket._trigger("controller:created", {
        _id: "foo"
      });
      expect(controllersCollection.clean.callCount).toEqual(1);
    });

    it("should clean controllersCollection when socket controller:deleted event is received", () => {
      socket._trigger("controller:deleted", {
        _id: "foo"
      });
      expect(controllersCollection.clean.callCount).toEqual(1);
    });

    it("should clean controllersCollection when socket controller:updated event is received", () => {
      socket._trigger("controller:updated", {
        _id: "foo"
      });
      expect(controllersCollection.clean.callCount).toEqual(1);
    });

    it("should clean controllersCollection when socket controllerToken:created event is received", () => {
      socket._trigger("controllerToken:created");
      expect(controllersCollection.clean.callCount).toEqual(1);
    });

    it("should clean controllersCollection when socket controllerToken:updated event is received", () => {
      socket._trigger("controllerToken:updated");
      expect(controllersCollection.clean.callCount).toEqual(1);
    });

    it("should clean controllersCollection when socket controllerToken:deleted event is received", () => {
      socket._trigger("controllerToken:deleted");
      expect(controllersCollection.clean.callCount).toEqual(1);
    });
  });

  describe("controllerModels listeners", () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      sandbox.stub(controllerModels, "client").resolves({});
      sandbox.spy(controllersCollection, "clean");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should clean controllersCollection when a controllerModel is deleted", async () => {
      expect.assertions(1);
      await controllerModels.byId("foo").delete();
      expect(controllersCollection.clean.callCount).toEqual(1);
    });

    it("should clean controllersCollection when a controllerModel is deleted", async () => {
      expect.assertions(1);
      await controllerModels.byId("foo").update({});
      expect(controllersCollection.clean.callCount).toEqual(1);
    });
  });
});
