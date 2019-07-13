## Responsive context

> The context value should never be set in production environments, it should be only used for testing or demo purposes.

The responsive context is used to force to render some specific "media-queries" in components that are using the "responsive" component, which is a wrapper for the [react-semantic-ui Responsive element](https://react.semantic-ui.com/addons/responsive). If the provided `force` property matchs with the context value, then the subyacent component will be displayed directly, without wrapping it with the the "react-semantic-ui Responsive element".

#### Usage

> Define a value for this context only in tests scenarios in which you need to force the render of specific media queries:


```jsx
import React from "react";
import { render, waitForElement } from "@testing-library/react";

import { BetaLabel } from "./BetaLabel";
import ResponsiveContext from "contexts/responsive";

describe("BetaLabel component", () => {
  it("should render in tablet and desktop", () => {
    const { getByTestId } = render(
      <ResponsiveContext.Provider value={{ force: "tablet-and-desktop" }}>
        <BetaLabel />
      </ResponsiveContext.Provider>
    );

    expect(getByTestId("beta-label")).toBeInTheDocument();
  });

  it("should not render in mobile", () => {
    const { queryByTestId } = render(
      <ResponsiveContext.Provider value={{ force: "mobile" }}>
        <BetaLabel />
      </ResponsiveContext.Provider>
    );

    expect(queryByTestId("beta-label")).toBeNull();
  });
});

```
