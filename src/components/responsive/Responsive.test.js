import React from "react";
import { render } from "@testing-library/react";

import ResponsiveContext from "contexts/responsive";

import { Responsive } from "./Responsive";

describe("External link", () => {
  it("should render an element containing children", () => {
    const { container } = render(<Responsive device={Responsive.DESKTOP}>Foo</Responsive>);
    expect(container).toHaveTextContent("Foo");
  });

  it("should render always content if forced context is MOBILE", () => {
    const { container } = render(
      <ResponsiveContext.Provider value={{ force: Responsive.MOBILE }}>
        <Responsive device={Responsive.MOBILE}>Foo</Responsive>
      </ResponsiveContext.Provider>
    );
    expect(container).toHaveTextContent("Foo");
  });

  it("should render always content if forced context is MOBILE_AND_TABLET", () => {
    const { container } = render(
      <ResponsiveContext.Provider value={{ force: Responsive.MOBILE_AND_TABLET }}>
        <Responsive device={Responsive.MOBILE_AND_TABLET}>Foo</Responsive>
      </ResponsiveContext.Provider>
    );
    expect(container).toHaveTextContent("Foo");
  });

  it("should render always content if forced context is TABLET", () => {
    const { container } = render(
      <ResponsiveContext.Provider value={{ force: Responsive.TABLET }}>
        <Responsive device={Responsive.TABLET}>Foo</Responsive>
      </ResponsiveContext.Provider>
    );
    expect(container).toHaveTextContent("Foo");
  });

  it("should render always content if forced context is DESKTOP", () => {
    const { container } = render(
      <ResponsiveContext.Provider value={{ force: Responsive.DESKTOP }}>
        <Responsive device={Responsive.DESKTOP}>Foo</Responsive>
      </ResponsiveContext.Provider>
    );
    expect(container).toHaveTextContent("Foo");
  });
});
