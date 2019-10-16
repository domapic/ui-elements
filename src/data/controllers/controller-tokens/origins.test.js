import sinon from "sinon";

import { socket } from "data/socket";

import { controllerTokensCollection } from "./origins";

describe("controllerTokensCollection origin", () => {
  describe("ofUser customQuery", () => {
    it("should return a query string with user id", () => {
      expect(controllerTokensCollection.customQueries.ofUser("foo-user-id")).toEqual({
        queryString: {
          user: "foo-user-id"
        }
      });
    });

    it("should return undefined if no user id is provided", () => {
      expect(controllerTokensCollection.customQueries.ofUser()).toEqual(undefined);
    });
  });

  describe("socket listeners", () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      sandbox.spy(controllerTokensCollection, "clean");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should clean controllerTokensCollection when socket controllerToken:created event is received", () => {
      socket._trigger("controllerToken:created");
      expect(controllerTokensCollection.clean.callCount).toEqual(1);
    });

    it("should clean controllerTokensCollection when socket controllerToken:deleted event is received", () => {
      socket._trigger("controllerToken:deleted");
      expect(controllerTokensCollection.clean.callCount).toEqual(1);
    });
  });
});
