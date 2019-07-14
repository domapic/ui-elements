import { mapDataSourceToProps } from "./Config";
import { customConfig } from "data/settings";

describe("Config controller", () => {
  describe("connect", () => {
    it("should connect customConfig data", () => {
      expect(mapDataSourceToProps().customConfig).toEqual(customConfig.read.getters.value);
    });
  });
});
