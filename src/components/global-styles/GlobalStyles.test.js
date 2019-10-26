import { SEMANTIC_URL } from "./GlobalStyles";

describe("Global styles", () => {
  it("should append semantic stylesheet", () => {
    expect(SEMANTIC_URL).toEqual("semantic/semantic.min.css");
  });
});
