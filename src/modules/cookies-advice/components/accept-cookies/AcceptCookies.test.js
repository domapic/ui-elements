import sinon from "sinon";
import React from "react";
import { render } from "@testing-library/react";
import { AcceptCookies } from "./AcceptCookies";

describe("AcceptCookies component", () => {
  const routes = {
    privacy: "/"
  };
  let sandbox;
  let onAccept;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    onAccept = sinon.spy();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should render nothing if cookies are accepted", () => {
    const { container } = render(
      <AcceptCookies accepted={true} onAccept={onAccept} routes={routes} />
    );
    expect(container).toBeEmpty();
  });
});
