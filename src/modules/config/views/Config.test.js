import React from "react";
import { render } from "@testing-library/react";
import { ConfigView } from "./Config";

describe("Config view", () => {
  it("should render custom configuration if it has length", () => {
    const { queryAllByTestId } = render(
      <ConfigView
        customConfig={[
          {
            label: "foo label",
            value: "foo value"
          }
        ]}
      />
    );
    const breadcrumbs = queryAllByTestId("breadcrumbs");
    expect(breadcrumbs[0]).toHaveTextContent("Base configuration");
    expect(breadcrumbs[1]).toHaveTextContent("Service custom configuration");
  });

  it("should not render custom configuration if it has no length", () => {
    const { queryAllByTestId } = render(<ConfigView customConfig={[]} />);
    const breadcrumbs = queryAllByTestId("breadcrumbs");
    expect(breadcrumbs[0]).toHaveTextContent("Base configuration");
  });
});
