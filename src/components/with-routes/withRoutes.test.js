import React from "react";
import { render } from "@testing-library/react";
import { withRoutes } from "./withRoutes";

describe("withRoutes HOC", () => {
  const ShowRouteToHome = withRoutes(({ routes }) => {
    return <div>Route to home: {routes.home}</div>;
  });

  it("should provide routes contexts through routes property to wrapped components", () => {
    const { container } = render(<ShowRouteToHome />);
    expect(container).toHaveTextContent("Route to home: /");
  });
});
