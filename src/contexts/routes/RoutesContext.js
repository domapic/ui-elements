import React from "react";

const defaultRoute = "/";

export const defaultRoutes = {
  index: defaultRoute,
  assets: defaultRoute,
  home: defaultRoute,
  resetPassword: defaultRoute,
  helpers: {
    getRoute: () => {}
  },
  sections: {},
  changeCurrentServer: () => {}
};

export const RoutesContext = React.createContext(defaultRoutes);
