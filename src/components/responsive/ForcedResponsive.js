import React from "react";
import PropTypes from "prop-types";

import Context from "contexts/responsive";

export const ForcedResponsive = ({ children, device, content }) => {
  return (
    <Context.Consumer>
      {contextValue => {
        if (contextValue.force) {
          if (contextValue.force !== device) {
            return null;
          }
          return content;
        }
        return children;
      }}
    </Context.Consumer>
  );
};

ForcedResponsive.propTypes = {
  children: PropTypes.node,
  content: PropTypes.node,
  device: PropTypes.string
};
