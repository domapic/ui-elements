import { mapDataSourceToProps } from "./AcceptCookies";
import { cookies, acceptCookies } from "data/legal";

describe("AcceptCookies controller", () => {
  describe("connect", () => {
    it("should connect accept property to cookies accepted selector", () => {
      const connectResult = mapDataSourceToProps();
      expect(connectResult.accepted).toEqual(cookies.accepted().read.getters.value);
    });

    it("should connect onAccept property to acceptCookies action", () => {
      const connectResult = mapDataSourceToProps();
      expect(connectResult.onAccept).toEqual(acceptCookies);
    });
  });
});
