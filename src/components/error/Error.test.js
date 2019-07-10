import React from "react";
import { render, waitForElement } from "@testing-library/react";

import { ErrorComponent } from "./Error";

describe("Error component", () => {
  it("should render provided error message", async () => {
    const { getByTestId } = render(<ErrorComponent>Error text</ErrorComponent>);

    await waitForElement(() => getByTestId("error-message"));

    expect(getByTestId("error-message")).toHaveTextContent("Error text");
  });
});
