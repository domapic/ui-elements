import { userAvatar } from "data/users/avatar/selectors";

import { cloudUserModels } from "./origins";
import { cloudUserMeWithExtraData, cloudUserModelsWithExtraData } from "./selectors";

describe("cloudUserMeWithExtraData selector", () => {
  describe("userAvatar query", () => {
    it("should pass cloudUserMe email to userAvatar.byEmail custom query", () => {
      expect(cloudUserMeWithExtraData.test.queries[0](null, [{ email: "foo@foo.com" }])).toEqual(
        userAvatar.customQueries.byEmail("foo@foo.com")
      );
    });
  });

  describe("results selector", () => {
    it("should extend cloudUserMe result with userAvatar result", () => {
      expect(
        cloudUserMeWithExtraData.test.selector(
          {
            foo: "foo"
          },
          {
            foo2: "foo2"
          }
        )
      ).toEqual({
        foo: "foo",
        foo2: "foo2"
      });
    });
  });
});

describe("cloudUserModelsWithExtraData selector", () => {
  describe("cloudUserModels query", () => {
    it("should pass query id to cloudUserModels.byId custom query", () => {
      expect(cloudUserModelsWithExtraData.test.queries[0]("foo-id")).toEqual(
        cloudUserModels.customQueries.byId("foo-id")
      );
    });
  });

  describe("userAvatar query", () => {
    it("should pass cloudUserModels email to userAvatar.byEmail custom query", () => {
      expect(
        cloudUserModelsWithExtraData.test.queries[1](null, [{ email: "foo@foo.com" }])
      ).toEqual(userAvatar.customQueries.byEmail("foo@foo.com"));
    });
  });

  describe("results selector", () => {
    it("should extend cloudUserModels result with userAvatar result", () => {
      expect(
        cloudUserModelsWithExtraData.test.selector(
          {
            foo: "foo"
          },
          {
            foo2: "foo2"
          }
        )
      ).toEqual({
        foo: "foo",
        foo2: "foo2"
      });
    });
  });

  describe("byId custom query", () => {
    it("should return provided id", () => {
      expect(cloudUserModelsWithExtraData.customQueries.byId("foo")).toEqual("foo");
    });
  });
});
