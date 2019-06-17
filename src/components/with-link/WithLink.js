import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

import RoutesContext from "contexts/routes";
import LinkContext from "contexts/link";

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name;
};

export const withLink = WrappedComponent => {
  const WithLinkComponent = props => (
    <LinkContext.Consumer>
      {Link => (
        <RoutesContext.Consumer>
          {routes => <WrappedComponent Link={Link} routes={routes} {...props} />}
        </RoutesContext.Consumer>
      )}
    </LinkContext.Consumer>
  );

  WithLinkComponent.displayName = `WithLink(${getDisplayName(WrappedComponent)})`;

  hoistNonReactStatics(WithLinkComponent, WrappedComponent);

  return WithLinkComponent;
};
