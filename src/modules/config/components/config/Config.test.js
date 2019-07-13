import React from "react";
import { render } from "@testing-library/react";
import { Config } from "./Config";

describe("Config component", () => {
  it("should render a table containing provided config", () => {
    const { container } = render(
      <Config
        config={[
          {
            label: "foo label",
            value: "foo value"
          }
        ]}
        loading={false}
        title="Foo"
      />
    );
    const td = container.querySelectorAll("td");
    expect(td[0]).toHaveTextContent("foo label");
    expect(td[1]).toHaveTextContent("foo value");
  });

  it("should render a table containing provided config even when is loading", () => {
    const { container } = render(
      <Config
        config={[
          {
            label: "foo label",
            value: "foo value"
          }
        ]}
        loading={true}
        title="Foo"
      />
    );
    const td = container.querySelectorAll("td");
    expect(td[0]).toHaveTextContent("foo label");
    expect(td[1]).toHaveTextContent("foo value");
  });

  it("should render error message when receives error", () => {
    const { getByTestId } = render(
      <Config loading={false} error={new Error("foo error")} title="Foo" />
    );
    expect(getByTestId("error-message")).toHaveTextContent("foo error");
  });
});
