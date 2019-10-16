import { controllersCollection } from "./origins";
import { controllersOfUserMe, controllersOfUserMeWithExtraData } from "./selectors";

describe("controllersOfUserMe selector", () => {
  describe("controllersCollection query", () => {
    it("should pass cloudUserMe id to controllersCollection.allowedUser custom query", () => {
      expect(controllersOfUserMe.test.queries[0](null, [{ _id: "foo-user-id" }])).toEqual(
        controllersCollection.customQueries.allowedUser("foo-user-id")
      );
    });
  });

  describe("results selector", () => {
    it("should return controllers collection", () => {
      expect(controllersOfUserMe.test.selector(null, "foo-result")).toEqual("foo-result");
    });
  });
});

describe("controllersOfUserMeWithExtraData selector", () => {
  describe("results selector", () => {
    it("should add userIsOwner and useCanConnect properties", () => {
      expect(
        controllersOfUserMeWithExtraData.test.selector(
          {
            _id: "foo-me-id"
          },
          [
            {
              _id: "foo-controller-id",
              _user: "foo-user-id"
            },
            {
              _id: "foo-controller-id-2",
              _user: "foo-user-id-2"
            },
            {
              _id: "foo-controller-id-3",
              _user: "foo-me-id"
            },
            {
              _id: "foo-controller-id-4",
              _user: "foo-me-id"
            }
          ],
          [
            {
              _controller: "foo-controller-id"
            },
            {
              _controller: "foo-controller-id-3"
            }
          ]
        )
      ).toEqual([
        {
          _id: "foo-controller-id",
          _user: "foo-user-id",
          userIsOwner: false,
          userCanConnect: true
        },
        {
          _id: "foo-controller-id-2",
          _user: "foo-user-id-2",
          userIsOwner: false,
          userCanConnect: false
        },
        {
          _id: "foo-controller-id-3",
          _user: "foo-me-id",
          userIsOwner: true,
          userCanConnect: true
        },
        {
          _id: "foo-controller-id-4",
          _user: "foo-me-id",
          userIsOwner: true,
          userCanConnect: false
        }
      ]);
    });
  });
});
