import React from "react";
import PropTypes from "prop-types";

import LinkContext from "contexts/link";

import ExternalLink from "components/external-link";

const LinkComponent = ({ to, children, ...rest }) => {
  const isInternal = to && to.indexOf("/") === 0;
  return (
    <LinkContext.Consumer>
      {Link => {
        const LinkToRender = isInternal && Link ? Link : ExternalLink;
        return (
          <LinkToRender to={to} {...rest}>
            {children}
          </LinkToRender>
        );
      }}
    </LinkContext.Consumer>
  );
};

LinkComponent.propTypes = {
  Link: PropTypes.func,
  children: PropTypes.node,
  to: PropTypes.string
};

export default LinkComponent;
