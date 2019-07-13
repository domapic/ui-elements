import { cookiesAreAccepted } from "./selectors";

describe("cookies selectors", () => {
  describe("cookiesAreAccepted", () => {
    describe("cookies origin query", () => {
      it("should return accepted key", () => {
        expect(cookiesAreAccepted.test.queries[0]()).toEqual("accepted");
      });
    });

    describe("selector function", () => {
      it("should return cookies origin result", () => {
        expect(cookiesAreAccepted.test.selector("foo")).toEqual("foo");
      });
    });
  });
});
