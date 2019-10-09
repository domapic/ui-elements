import React from "react";
import { render } from "@testing-library/react";
import { Visibility } from "./Visibility";

describe("Visibility Context", () => {
  it("should have a default value of null", () => {
    let value;
    render(
      <Visibility.Consumer>
        {contextValue => {
          value = contextValue;
          return null;
        }}
      </Visibility.Consumer>
    );
    expect(value).toEqual(null);
  });
});
