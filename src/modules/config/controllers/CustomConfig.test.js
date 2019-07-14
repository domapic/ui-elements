import { mapDataSourceToProps } from "./CustomConfig";
import { customConfig } from "data/service";

describe("CustomConfig controller", () => {
  describe("connect", () => {
    it("should connect config data properties", () => {
      const connectResult = mapDataSourceToProps();
      expect(connectResult.config).toEqual(customConfig.read.getters.value);
      expect(connectResult.loading).toEqual(customConfig.read.getters.loading);
      expect(connectResult.error).toEqual(customConfig.read.getters.error);
    });
  });
});
