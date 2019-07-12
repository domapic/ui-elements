import React from "react";
import PropTypes from "prop-types";

import "components/global-styles";

const ExternalLink = ({ to, children, self, ...rest }) => {
  const newWindow = self
    ? {}
    : {
        target: "_blank",
        rel: "noopener noreferrer"
      };

  return (
    <a href={to} {...newWindow} {...rest}>
      {children}
    </a>
  );
};

ExternalLink.propTypes = {
  children: PropTypes.node,
  self: PropTypes.bool,
  to: PropTypes.string
};

export default ExternalLink;
