import React from "react";

const defaultRoute = "/";

export const defaultRoutes = {
  index: defaultRoute,
  assets: defaultRoute,
  privacy: "",
  home: defaultRoute,
  resetPassword: defaultRoute,
  helpers: {
    getRoute: () => {}
  },
  sections: {},
  changeCurrentServer: () => {}
};

export const RoutesContext = React.createContext(defaultRoutes);
