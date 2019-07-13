import React from "react";
import { render } from "@testing-library/react";
import { Link } from "./Link";

describe("Link Context", () => {
  it("should have a default value of null", () => {
    let value;
    render(
      <Link.Consumer>
        {contextValue => {
          value = contextValue;
          return null;
        }}
      </Link.Consumer>
    );
    expect(value).toEqual(null);
  });
});
