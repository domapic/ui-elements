import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import "jest-dom/extend-expect";

import { ErrorComponent } from "./Error";

afterEach(cleanup);

describe("Error component", () => {
  it("should render provided error message", async () => {
    const { getByTestId } = render(<ErrorComponent>Error text</ErrorComponent>);

    await waitForElement(() => getByTestId("error-message"));

    expect(getByTestId("error-message")).toHaveTextContent("Error text");
  });
});
