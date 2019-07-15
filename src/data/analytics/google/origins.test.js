import { googleAnalytics } from "./origins";

describe("googleAnalytics origin", () => {
  it("should have be inactive by default", () => {
    expect(googleAnalytics.read.value.active).toEqual(false);
  });
});
