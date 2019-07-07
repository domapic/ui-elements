import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import "jest-dom/extend-expect";

import { BetaLabel } from "./BetaLabel";
import ResponsiveContext from "contexts/responsive";

afterEach(cleanup);

describe("BetaLabel component", () => {
  it("should render beta message", async () => {
    const { getByTestId } = render(<BetaLabel />);

    await waitForElement(() => getByTestId("beta-label"));

    expect(getByTestId("beta-label")).toHaveTextContent("BETA version");
  });

  it("should render in tablet and desktop", async () => {
    const { getByTestId } = render(
      <ResponsiveContext.Provider value={{ force: "tablet-and-desktop" }}>
        <BetaLabel />
      </ResponsiveContext.Provider>
    );

    await waitForElement(() => getByTestId("beta-label"));

    expect(getByTestId("beta-label")).toBeInTheDocument();
  });

  it("should not render in mobile", async () => {
    const { queryByTestId } = render(
      <ResponsiveContext.Provider value={{ force: "mobile" }}>
        <BetaLabel />
      </ResponsiveContext.Provider>
    );

    expect(queryByTestId("beta-label")).toBeNull();
  });
});
