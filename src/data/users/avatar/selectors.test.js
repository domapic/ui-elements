import md5 from "md5";
import { userAvatar } from "./selectors";

describe("userAvatar selector", () => {
  describe("gravatar query", () => {
    it("should bypass query", () => {
      expect(userAvatar.test.queries[0]("foo")).toEqual("foo");
    });
  });

  describe("results selector", () => {
    it("should return responseURL property if status is 200", () => {
      expect(
        userAvatar.test.selector({
          status: 200,
          request: {
            responseURL: "foo-url"
          }
        })
      ).toEqual({ avatar: "foo-url" });
    });

    it("should return null if status is not 200", () => {
      expect(
        userAvatar.test.selector({
          status: 500,
          request: {
            responseURL: "foo-url"
          }
        })
      ).toEqual({ avatar: null });
    });
  });

  describe("custom queries", () => {
    describe("byEmail", () => {
      it("should return md5 email and 404 querystring parameter", () => {
        expect(userAvatar.test.customQueries.byEmail("foo-EMAIL@foo.com")).toEqual({
          urlParams: {
            hash: md5("foo-email@foo.com")
          },
          queryString: {
            d: 404
          }
        });
      });

      it("should return md5 email and 404 querystring parameter if no email is provided", () => {
        expect(userAvatar.test.customQueries.byEmail()).toEqual({
          urlParams: {
            hash: md5("")
          },
          queryString: {
            d: 404
          }
        });
      });
    });
  });
});
