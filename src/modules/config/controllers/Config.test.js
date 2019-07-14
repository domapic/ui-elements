import { mapDataSourceToProps } from "./Config";
import { customConfig } from "data/service";

describe("Config controller", () => {
  describe("connect", () => {
    it("should connect customConfig data", () => {
      expect(mapDataSourceToProps().customConfig).toEqual(customConfig.read.getters.value);
    });
  });
});
