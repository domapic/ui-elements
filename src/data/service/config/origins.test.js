import { config } from "./origins";

describe("config origin", () => {
  it("should have a default value of empty object", () => {
    expect(config.read.value).toEqual({});
  });
});
