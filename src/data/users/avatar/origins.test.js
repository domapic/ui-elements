import { gravatar } from "./origins";

describe("gravatar origin", () => {
  describe("validateStatus callback", () => {
    it("should return true", () => {
      expect(gravatar._configuration.validateStatus()).toEqual(true);
    });
  });
});
