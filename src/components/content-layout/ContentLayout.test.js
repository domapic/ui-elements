import React from "react";
import { render } from "@testing-library/react";
import "jest-dom/extend-expect";

import { ContentLayout } from "./ContentLayout";

describe("ContentLayout component", () => {
  it("should render the header area", () => {
    const { getByTestId } = render(
      <ContentLayout>
        <ContentLayout.Header>Foo</ContentLayout.Header>
      </ContentLayout>
    );

    expect(getByTestId("content-layout-header")).toHaveTextContent("Foo");
  });
});
