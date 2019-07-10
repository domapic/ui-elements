import React from "react";
import { render } from "@testing-library/react";
import ExternalLink from "./ExternalLink";

describe("External link", () => {
  it("should render an a element containing passed children", () => {
    const { container } = render(
      <ExternalLink to="domapic.com" self>
        Domapic
      </ExternalLink>
    );
    const link = container.querySelector("a");
    expect(link).toHaveTextContent("Domapic");
  });

  describe("without self prop", () => {
    it("should render a link with target equal _blank and rel equal noopener noreferrer", () => {
      const { container } = render(<ExternalLink to="domapic.com">Domapic</ExternalLink>);
      const link = container.querySelector("a");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
