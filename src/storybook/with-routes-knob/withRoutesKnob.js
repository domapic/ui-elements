import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

import RoutesContext from "contexts/routes";
import { object } from "@storybook/addon-knobs";

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name;
};

export const withRoutesKnob = routesValues => {
  return WrappedComponent => {
    const WithRoutesComponent = props => (
      <RoutesContext.Provider value={object("routes context", routesValues)}>
        <WrappedComponent {...props} />
      </RoutesContext.Provider>
    );

    WithRoutesComponent.displayName = `WithRoutesKnob(${getDisplayName(WrappedComponent)})`;

    hoistNonReactStatics(WithRoutesComponent, WrappedComponent);

    return WithRoutesComponent;
  };
};
