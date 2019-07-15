import { registrationKeysConfirm, registrationKeysModels } from "./origins";

import { byKeyQuery } from "helpers/api";

describe("registrationKeysConfirm origin", () => {
  describe("byKey customQuery", () => {
    it("should be byKey query helper", () => {
      expect(registrationKeysConfirm.customQueries.byKey).toEqual(byKeyQuery);
    });
  });
});

describe("registrationKeysModels origin", () => {
  describe("byKey customQuery", () => {
    it("should be byKey query helper", () => {
      expect(registrationKeysModels.customQueries.byKey).toEqual(byKeyQuery);
    });
  });
});
