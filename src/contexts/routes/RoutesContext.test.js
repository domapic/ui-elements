import React from "react";
import { render } from "@testing-library/react";
import { RoutesContext } from "./RoutesContext";

describe("Routes Context", () => {
  const defaultRoute = "/";

  it("should have default values for all used routes", () => {
    expect.assertions(5);
    let value;
    render(
      <RoutesContext.Consumer>
        {contextValue => {
          value = contextValue;
          return null;
        }}
      </RoutesContext.Consumer>
    );
    expect(value.index).toEqual(defaultRoute);
    expect(value.assets).toEqual(defaultRoute);
    expect(value.privacy).toEqual(defaultRoute);
    expect(value.home).toEqual(defaultRoute);
    expect(value.resetPassword).toEqual(defaultRoute);
  });

  it("should have a default value for sections", () => {
    let value;
    render(
      <RoutesContext.Consumer>
        {contextValue => {
          value = contextValue;
          return null;
        }}
      </RoutesContext.Consumer>
    );
    expect(value.sections).toEqual({});
  });

  it("should have a default helper for getting routes", () => {
    let value;
    render(
      <RoutesContext.Consumer>
        {contextValue => {
          value = contextValue;
          return null;
        }}
      </RoutesContext.Consumer>
    );
    expect(value.helpers.getRoute()).toEqual(defaultRoute);
  });

  it("should have a default function for changing current server in routes", () => {
    let value;
    render(
      <RoutesContext.Consumer>
        {contextValue => {
          value = contextValue;
          return null;
        }}
      </RoutesContext.Consumer>
    );
    expect(value.changeCurrentServer()).toEqual(undefined);
  });
});
