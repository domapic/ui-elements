## Visibility context

> The context value should never be set in production environments, it should be only used for testing or demo purposes.

The visibility context is used to force to trigger callbacks of the `components/visibility` component, which is a wrapper for the [react-semantic-ui Visibility behavior](https://react.semantic-ui.com/behaviors/visibility). If the context `value` property matches with the provided callback property name, then the callback will be triggered automatically when the component is rendered.

#### Usage

> Define a value for this context only in tests scenarios in which you need to force to trigger the visibility callbacks:


```jsx
import React from "react";
import { render, waitForElement } from "@testing-library/react";

import { ContentLayout } from "./ContentLayout";
import VisibilityContext from "contexts/visibility";

describe("ContentLayout component", () => {
  it("should render fixed header when header container is not visible in scroll", () => {
    const { queryByTestId } = render(
      <VisibilityContext.Provider value="onTopPassed">
        <ContentLayout />
      </VisibilityContext.Provider>
    );

    expect(queryByTestId("content-layout-search-container--fixed")).toBeDefined();
  });
});

```
