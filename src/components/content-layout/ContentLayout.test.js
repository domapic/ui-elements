import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "jest-dom/extend-expect";

import { ContentLayout } from "./ContentLayout";
import VisibilityContext from "contexts/visibility";
import ResponsiveContext from "contexts/responsive";

describe("ContentLayout component", () => {
  it("should render the header area", () => {
    const { getByTestId } = render(
      <ContentLayout>
        <ContentLayout.Header>Foo</ContentLayout.Header>
      </ContentLayout>
    );

    expect(getByTestId("content-layout-header")).toHaveTextContent("Foo");
  });

  it("should render the header placeholder while is loading", () => {
    const { getByTestId } = render(
      <ContentLayout>
        <ContentLayout.Header loading={true}>Foo</ContentLayout.Header>
      </ContentLayout>
    );

    expect(getByTestId("content-layout-header--placeholder")).toBeDefined();
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

  it("should not render the search area fixed to top when search container is visible in scroll again", () => {
    const { getByTestId } = render(
      <VisibilityContext.Provider value="onTopPassedReverse">
        <ContentLayout>
          <ContentLayout.Search />
        </ContentLayout>
      </VisibilityContext.Provider>
    );

    expect(getByTestId("content-layout-search-container")).toBeDefined();
  });

  it("should render the menu area", () => {
    const { getByTestId } = render(
      <ContentLayout>
        <ContentLayout.Menu>Foo</ContentLayout.Menu>
      </ContentLayout>
    );

    expect(getByTestId("content-layout-menu")).toHaveTextContent("Foo");
  });

  it("should renden the mobile search container when displayed on mobile devices and the search button is clicked", () => {
    const { getByTestId } = render(
      <ResponsiveContext.Provider value={{ force: "mobile" }}>
        <ContentLayout>
          <ContentLayout.Search />
        </ContentLayout>
      </ResponsiveContext.Provider>
    );

    fireEvent.click(getByTestId("content-layout-search-button--mobile"));
    expect(getByTestId("content-layout-search-container--mobile")).toBeDefined();
  });
});
