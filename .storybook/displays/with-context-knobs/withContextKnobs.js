import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

import { object } from "@storybook/addon-knobs";

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name;
};

export const withContextKnobs = (Context, value) => {
  return WrappedComponent => {
    const WithContextComponent = props => (
      <Context.Provider value={value}>
        <WrappedComponent {...props} />
      </Context.Provider>
    );

    WithContextComponent.displayName = `WithContextKnobs(${getDisplayName(WrappedComponent)})`;

    hoistNonReactStatics(WithContextComponent, WrappedComponent);

    return WithContextComponent;
  };
};
