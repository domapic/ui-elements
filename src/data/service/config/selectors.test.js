import { baseConfig, customConfig } from "./selectors";

describe("config selectors", () => {
  describe("baseConfig", () => {
    describe("selector function", () => {
      it("should return common configuration properties, adding extra data", () => {
        expect(
          baseConfig.test.selector({
            logLevel: "foo"
          })
        ).toEqual([
          {
            key: "logLevel",
            label: "Log Level",
            value: "foo",
            originalValue: "foo"
          }
        ]);
      });

      it("should return an empty array if no common configuration properties are received", () => {
        expect(
          baseConfig.test.selector({
            foo: "foo"
          })
        ).toEqual([]);
      });
    });
  });

  describe("customConfig", () => {
    describe("selector function", () => {
      it("should return custom configuration properties, adding extra data", () => {
        expect(
          customConfig.test.selector({
            foo: true
          })
        ).toEqual([
          {
            key: "foo",
            label: "foo",
            value: "true",
            originalValue: true
          }
        ]);
      });

      it("should return an empty array if no custom configuration properties are received", () => {
        expect(
          customConfig.test.selector({
            hostName: "foo"
          })
        ).toEqual([]);
      });
    });
  });
});
