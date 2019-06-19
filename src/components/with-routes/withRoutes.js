import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

import RoutesContext from "contexts/routes";

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name;
};

export const withRoutes = WrappedComponent => {
  const WithRoutesComponent = props => (
    <RoutesContext.Consumer>
      {routes => <WrappedComponent routes={routes} {...props} />}
    </RoutesContext.Consumer>
  );

  WithRoutesComponent.displayName = `WithRoutes(${getDisplayName(WrappedComponent)})`;

  hoistNonReactStatics(WithRoutesComponent, WrappedComponent);

  return WithRoutesComponent;
};
