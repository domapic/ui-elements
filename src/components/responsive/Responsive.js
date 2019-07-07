import React from "react";
import PropTypes from "prop-types";
import { Responsive as SemanticResponsive } from "semantic-ui-react";

import { ForcedResponsive } from "./ForcedResponsive";

export const windowInnerWidth = () => window.innerWidth;

export const Responsive = ({ device, as, className, children }) => {
  switch (device) {
    case "mobile":
      return (
        <ForcedResponsive device={device} content={children}>
          <SemanticResponsive
            as={as}
            getWidth={windowInnerWidth}
            maxWidth={SemanticResponsive.onlyMobile.maxWidth}
            className={className}
          >
            {children}
          </SemanticResponsive>
        </ForcedResponsive>
      );
    case "mobile-and-tablet":
      return (
        <ForcedResponsive device={device} content={children}>
          <SemanticResponsive
            as={as}
            getWidth={windowInnerWidth}
            maxWidth={SemanticResponsive.onlyTablet.maxWidth}
            className={className}
          >
            {children}
          </SemanticResponsive>
        </ForcedResponsive>
      );
    case "tablet":
      return (
        <ForcedResponsive device={device} content={children}>
          <SemanticResponsive
            as={as}
            getWidth={windowInnerWidth}
            {...SemanticResponsive.onlyTablet}
            className={className}
          >
            {children}
          </SemanticResponsive>
        </ForcedResponsive>
      );
    case "tablet-and-desktop":
      return (
        <ForcedResponsive device={device} content={children}>
          <SemanticResponsive
            as={as}
            getWidth={windowInnerWidth}
            minWidth={SemanticResponsive.onlyTablet.minWidth}
            className={className}
          >
            {children}
          </SemanticResponsive>
        </ForcedResponsive>
      );
    case "desktop":
      return (
        <ForcedResponsive device={device} content={children}>
          <SemanticResponsive
            as={as}
            getWidth={windowInnerWidth}
            {...SemanticResponsive.onlyComputer}
            className={className}
          >
            {children}
          </SemanticResponsive>
        </ForcedResponsive>
      );
  }
};

Responsive.propTypes = {
  as: PropTypes.any,
  children: PropTypes.node,
  className: PropTypes.string,
  device: PropTypes.string
};
