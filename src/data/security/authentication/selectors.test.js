import { authSessionDetails, authSessionRemember, authSessionTemporal } from "./origins";
import { authSession } from "./selectors";

describe("authSession selector", () => {
  describe("authSessionDetails query", () => {
    it("should pass query to authSessionDetails.rememberMe custom query", () => {
      expect(authSession.test.queries[0]("foo")).toEqual(
        authSessionDetails.customQueries.rememberMe("foo")
      );
    });
  });

  describe("results selector", () => {
    it("should return authSessionRemember queried by authenticationType if authSession has to be remembered", () => {
      expect(authSession.test.selector(true, "foo-auth-type")).toEqual(
        authSessionRemember.query("foo-auth-type")
      );
    });

    it("should return authSessionTemporal queried by authenticationType if authSession has not to be remembered", () => {
      expect(authSession.test.selector(false, "foo-auth-type")).toEqual(
        authSessionTemporal.query("foo-auth-type")
      );
    });
  });

  describe("custom queries", () => {
    describe("refreshToken", () => {
      it("should return refreshToken key", () => {
        expect(authSession.test.customQueries.refreshToken()).toEqual("refreshToken");
      });
    });

    describe("apiKey", () => {
      it("should return apiKey key", () => {
        expect(authSession.test.customQueries.apiKey()).toEqual("apiKey");
      });
    });
  });
});
