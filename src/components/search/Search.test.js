import React from "react";
import { render } from "@testing-library/react";

import { Search } from "./Search";

describe("Search component", () => {
  it("should render search field with provided value", () => {
    const { container } = render(<Search searchValue="foo" />);
    expect(container.querySelector("input")).toHaveValue("foo");
  });
});
