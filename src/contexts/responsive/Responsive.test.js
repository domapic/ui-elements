import React from "react";
import { render } from "@testing-library/react";
import { Responsive } from "./Responsive";

describe("Responsive Context", () => {
  it("should have a force property with default value of null", () => {
    let value;
    render(
      <Responsive.Consumer>
        {contextValue => {
          value = contextValue;
          return null;
        }}
      </Responsive.Consumer>
    );
    expect(value).toEqual({ force: null });
  });
});
