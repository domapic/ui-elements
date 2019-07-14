import React from "react";

const defaultRoute = "/";

export const defaultRoutes = {
  index: defaultRoute,
  assets: defaultRoute,
  privacy: defaultRoute,
  home: defaultRoute,
  resetPassword: defaultRoute,
  helpers: {
    getRoute: () => {
      return defaultRoute;
    }
  },
  sections: {},
  changeCurrentController: () => {}
};

export const RoutesContext = React.createContext(defaultRoutes);
