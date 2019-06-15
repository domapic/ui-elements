import React from "react";
import PropTypes from "prop-types";
import { Responsive as SemanticResponsive } from "semantic-ui-react";

export const windowInnerWidth = () => window.innerWidth;

export const Responsive = ({ device, as, className, children }) => {
  switch (device) {
    case "mobile":
      return (
        <SemanticResponsive
          as={as}
          getWidth={windowInnerWidth}
          maxWidth={SemanticResponsive.onlyMobile.maxWidth}
          className={className}
        >
          {children}
        </SemanticResponsive>
      );
    case "mobile-and-tablet":
      return (
        <SemanticResponsive
          as={as}
          getWidth={windowInnerWidth}
          maxWidth={SemanticResponsive.onlyTablet.maxWidth}
          className={className}
        >
          {children}
        </SemanticResponsive>
      );
    case "tablet":
      return (
        <SemanticResponsive
          as={as}
          getWidth={windowInnerWidth}
          {...SemanticResponsive.onlyTablet}
          className={className}
        >
          {children}
        </SemanticResponsive>
      );
    case "tablet-and-desktop":
      return (
        <SemanticResponsive
          as={as}
          getWidth={windowInnerWidth}
          minWidth={SemanticResponsive.onlyTablet.minWidth}
          className={className}
        >
          {children}
        </SemanticResponsive>
      );
    case "desktop":
      return (
        <SemanticResponsive
          as={as}
          getWidth={windowInnerWidth}
          {...SemanticResponsive.onlyComputer}
          className={className}
        >
          {children}
        </SemanticResponsive>
      );
  }
};

Responsive.propTypes = {
  as: PropTypes.any,
  children: PropTypes.node,
  className: PropTypes.string,
  device: PropTypes.string
};
