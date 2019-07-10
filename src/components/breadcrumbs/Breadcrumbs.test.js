import React from "react";
import { render } from "@testing-library/react";
import "jest-dom/extend-expect";

import { Breadcrumbs } from "./Breadcrumbs";

describe("Breadcrumbs component", () => {
  const FOO_SECTIONS = [
    {
      text: "foo",
      url: "bar"
    },
    {
      text: "foo2",
      url: "bar2"
    }
  ];

  const FOO_SECTIONS_WITH_ICONS = [
    {
      text: "foo",
      url: "bar",
      icon: "cube"
    },
    {
      text: "foo2",
      url: "bar2",
      icon: "bolt"
    }
  ];

  it("should render without throwing any errors", () => {
    const result = () => render(<Breadcrumbs sections={[]} />);
    expect(result).not.toThrow();
  });

  it("should render as muchs links as sections minus one", () => {
    const { container } = render(<Breadcrumbs sections={FOO_SECTIONS} />);
    const links = [...container.querySelectorAll("a")];
    expect(links.length).toEqual(1);
  });

  it("should render links with provided texts", () => {
    const { container } = render(<Breadcrumbs sections={FOO_SECTIONS} />);
    const links = [...container.querySelectorAll("a")];
    expect(links[0]).toHaveTextContent("foo");
  });

  it("should render links with provided urls", () => {
    const { container } = render(<Breadcrumbs sections={FOO_SECTIONS} />);
    const links = [...container.querySelectorAll("a")];
    expect(links[0]).toHaveAttribute("href", "bar");
  });

  it("should render last provided section as a span", () => {
    const { container } = render(<Breadcrumbs sections={FOO_SECTIONS} />);
    const spans = [...container.querySelectorAll("span")];
    expect(spans[2]).toHaveTextContent("foo2");
  });

  it("should render icons in links if provided", () => {
    const { container } = render(<Breadcrumbs sections={FOO_SECTIONS_WITH_ICONS} />);
    const icons = [...container.querySelectorAll("a i.icon")];
    expect(icons[0]).toHaveClass("cube");
  });

  it("should render icon in current section if provided", () => {
    const { container } = render(<Breadcrumbs sections={FOO_SECTIONS_WITH_ICONS} />);
    const icons = [...container.querySelectorAll("i.icon")];
    expect(icons[1]).toHaveClass("bolt");
  });
});
