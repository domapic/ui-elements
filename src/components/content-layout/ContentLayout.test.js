import React from "react";
import { render } from "@testing-library/react";
import "jest-dom/extend-expect";

import { ContentLayout } from "./ContentLayout";
import VisibilityContext from "contexts/visibility";

describe("ContentLayout component", () => {
  it("should render the header area", () => {
    const { getByTestId } = render(
      <ContentLayout>
        <ContentLayout.Header>Foo</ContentLayout.Header>
      </ContentLayout>
    );

    expect(getByTestId("content-layout-header")).toHaveTextContent("Foo");
  });

  it("should render the content area", () => {
    const { getByTestId } = render(
      <ContentLayout>
        <ContentLayout.Content>Foo</ContentLayout.Content>
      </ContentLayout>
    );

    expect(getByTestId("content-layout-content")).toHaveTextContent("Foo");
  });

  it("should render the placeholder in the content area if loading is true", () => {
    const { getByTestId } = render(
      <ContentLayout loading={true}>
        <ContentLayout.Placeholder>Foo</ContentLayout.Placeholder>
      </ContentLayout>
    );

    expect(getByTestId("content-layout-content")).toHaveTextContent("Foo");
  });

  it("should render the search component in the search area", () => {
    const { getByTestId } = render(
      <ContentLayout>
        <ContentLayout.Search />
      </ContentLayout>
    );

    expect(getByTestId("search-field")).toBeDefined();
  });

  it("should render the search area fixed to top when search container is not visible in scroll", () => {
    const { getByTestId } = render(
      <VisibilityContext.Provider value="onTopPassed">
        <ContentLayout>
          <ContentLayout.Search />
        </ContentLayout>
      </VisibilityContext.Provider>
    );

    expect(getByTestId("content-layout-search-container--fixed")).toBeDefined();
  });

  it("should render the menu area", () => {
    const { getByTestId } = render(
      <ContentLayout>
        <ContentLayout.Menu>Foo</ContentLayout.Menu>
      </ContentLayout>
    );

    expect(getByTestId("content-layout-menu")).toHaveTextContent("Foo");
  });
});
