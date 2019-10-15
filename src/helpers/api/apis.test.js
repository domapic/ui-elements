import { getAuthConfig, byIdQuery, byKeyQuery } from "./index";

describe("apis helpers", () => {
  describe("getAuthConfig method", () => {
    it("should return configuration adding auth tag and default value", () => {
      expect(
        getAuthConfig("foo-default-value", {
          foo: "foo-value"
        })
      ).toEqual({
        tags: ["need_auth"],
        defaultValue: "foo-default-value",
        foo: "foo-value"
      });
    });
  });

  describe("byIdQuery method", () => {
    it("should return url params containing id", () => {
      expect(byIdQuery("foo-id")).toEqual({
        urlParams: {
          id: "foo-id"
        }
      });
    });

    it("should return undefined if no id is provided", () => {
      expect(byIdQuery()).toEqual(undefined);
    });
  });

  describe("byKeyQuery method", () => {
    it("should return url params containing key", () => {
      expect(byKeyQuery("foo-key")).toEqual({
        urlParams: {
          key: "foo-key"
        }
      });
    });
  });
});
