import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

import RoutesContext from "contexts/routes";

import Link from "components/link";

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name;
};

export const withLink = WrappedComponent => {
  const WithLinkComponent = props => (
    <RoutesContext.Consumer>
      {routes => <WrappedComponent Link={Link} routes={routes} {...props} />}
    </RoutesContext.Consumer>
  );

  WithLinkComponent.displayName = `WithLink(${getDisplayName(WrappedComponent)})`;

  hoistNonReactStatics(WithLinkComponent, WrappedComponent);

  return WithLinkComponent;
};
