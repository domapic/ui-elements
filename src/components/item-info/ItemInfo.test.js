import React from "react";
import { render } from "@testing-library/react";
import { ItemInfo } from "./ItemInfo";

describe("Item Info", () => {
  it("should render a table containing data", () => {
    const { container } = render(
      <ItemInfo
        data={[
          {
            label: "foo label",
            value: "foo value"
          },
          {
            label: "foo label 2",
            value: "foo value 2"
          }
        ]}
      />
    );
    const td = container.querySelectorAll("td");
    expect(td[0]).toHaveTextContent("foo label");
    expect(td[1]).toHaveTextContent("foo value");
    expect(td[2]).toHaveTextContent("foo label 2");
    expect(td[3]).toHaveTextContent("foo value 2");
  });
});
