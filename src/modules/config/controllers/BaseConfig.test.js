import { mapDataSourceToProps } from "./BaseConfig";
import { baseConfig } from "data/settings";

describe("BaseConfig controller", () => {
  describe("connect", () => {
    it("should connect config data properties", () => {
      const connectResult = mapDataSourceToProps();
      expect(connectResult.config).toEqual(baseConfig.read.getters.value);
      expect(connectResult.loading).toEqual(baseConfig.read.getters.loading);
      expect(connectResult.error).toEqual(baseConfig.read.getters.error);
    });
  });
});
