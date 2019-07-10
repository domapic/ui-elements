import React from "react";
import PropTypes from "prop-types";

export const ContentArea = ({ children }) => <React.Fragment>{children}</React.Fragment>;

ContentArea.displayName = "ContentContent";

ContentArea.propTypes = {
  children: PropTypes.node
};
