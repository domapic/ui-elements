import React, { Fragment } from "react";
import PropTypes from "prop-types";

export const MenuArea = ({ children }) => <Fragment>{children}</Fragment>;

MenuArea.displayName = "ContentMenu";

MenuArea.propTypes = {
  children: PropTypes.node
};
