import { cookies } from "./origins";

describe("cookies origin", () => {
  describe("accepted customQuery", () => {
    it("should return accepted key", () => {
      expect(cookies.customQueries.accepted()).toEqual("accepted");
    });
  });

  describe("listeners", () => {
    it("should clean full origin when any queried instance is cleaned", () => {
      let cleanCallback = jest.fn();
      cookies.onClean(cleanCallback);
      cookies.accepted().clean();
      expect(cleanCallback).toHaveBeenCalled();
    });
  });
});
