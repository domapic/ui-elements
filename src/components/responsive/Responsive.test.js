import React from "react";
import { render } from "@testing-library/react";
import { Responsive } from "./Responsive";

describe("External link", () => {
  it("should render an a element containing children", () => {
    const { container } = render(<Responsive device={Responsive.DESKTOP}>Foo</Responsive>);
    expect(container).toHaveTextContent("Foo");
  });
});
