import { resetPasswordKeysModels, resetPasswordKeysConfirm } from "./origins";

import { byKeyQuery } from "helpers/api";

describe("resetPasswordKeysModels origin", () => {
  describe("byKey customQuery", () => {
    it("should be byKey query helper", () => {
      expect(resetPasswordKeysModels.customQueries.byKey).toEqual(byKeyQuery);
    });
  });
});

describe("resetPasswordKeysConfirm origin", () => {
  describe("byKey customQuery", () => {
    it("should be byKey query helper", () => {
      expect(resetPasswordKeysConfirm.customQueries.byKey).toEqual(byKeyQuery);
    });
  });
});
