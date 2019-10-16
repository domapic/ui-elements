import { controllerTokensCollection } from "./origins";
import { controllerTokensOfUserMe } from "./selectors";

describe("controllerTokensOfUserMe selector", () => {
  describe("controllerTokensCollection query", () => {
    it("should pass cloudUserMe id to controllerTokensCollection.ofUser custom query", () => {
      expect(controllerTokensOfUserMe.test.queries[0](null, [{ _id: "foo-user-id" }])).toEqual(
        controllerTokensCollection.customQueries.ofUser("foo-user-id")
      );
    });
  });

  describe("results selector", () => {
    it("should convert received _server property into _controller property in all items in collection", () => {
      expect(
        controllerTokensOfUserMe.test.selector(null, [
          {
            id: "foo",
            _server: "foo-server"
          },
          {
            id: "foo2",
            _server: "foo-server2"
          }
        ])
      ).toEqual([
        {
          id: "foo",
          _server: "foo-server",
          _controller: "foo-server"
        },
        {
          id: "foo2",
          _server: "foo-server2",
          _controller: "foo-server2"
        }
      ]);
    });
  });
});
