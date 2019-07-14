import sinon from "sinon";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
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

  it("should render content if cookies are not accepted", () => {
    const { container } = render(
      <AcceptCookies accepted={false} onAccept={onAccept} routes={routes} />
    );
    expect(container).not.toBeEmpty();
  });

  it("should dispatch acceptCookies action when button is clicked", () => {
    const { getByTestId } = render(
      <AcceptCookies accepted={false} onAccept={onAccept} routes={routes} />
    );
    fireEvent.click(getByTestId("accept-cookies-button"));
    expect(onAccept.callCount).toEqual(1);
  });
});
