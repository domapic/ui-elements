import React from "react";
import PropTypes from "prop-types";
import { render } from "@testing-library/react";
import { createBrowserHistory } from "history";
import { Link as ReactRouterLink, Router } from "react-router-dom";

import LinkContext from "contexts/link";
import Link from "./Link";

const history = createBrowserHistory({
  basename: "/"
});

const WithLinkContext = ({ children }) => {
  return (
    <Router history={history}>
      <LinkContext.Provider value={ReactRouterLink}>{children}</LinkContext.Provider>
    </Router>
  );
};

WithLinkContext.propTypes = {
  children: PropTypes.node
};

describe("Link", () => {
  it("should render a link with defined children", () => {
    const { container } = render(<Link to="foo">Foo</Link>);
    const link = container.querySelector("a");
    expect(link).toHaveTextContent("Foo");
  });

  it("should render an internal link if link context is defined and url starts with /", () => {
    const { container } = render(
      <WithLinkContext>
        <Link to="/foo">Foo</Link>
      </WithLinkContext>
    );
    const link = container.querySelector("a");
    expect(link).not.toHaveAttribute("target", "_blank");
  });

  it("should render an external link if link context is not defined", () => {
    const { container } = render(<Link to="foo">Foo</Link>);
    const link = container.querySelector("a");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should render an external link if to property starts with http", () => {
    const { container } = render(
      <WithLinkContext>
        <Link to="http://www.foo">Foo</Link>
      </WithLinkContext>
    );
    const link = container.querySelector("a");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
