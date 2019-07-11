import React from "react";
import PropTypes from "prop-types";
import { Responsive as SemanticResponsive } from "semantic-ui-react";

import { ForcedResponsive } from "./ForcedResponsive";

export const windowInnerWidth = () => window.innerWidth;

const MOBILE = "mobile";
const MOBILE_AND_TABLET = "mobile-and-tablet";
const TABLET = "tablet";
const TABLET_AND_DESKTOP = "tablet-and-desktop";
const DESKTOP = "desktop";

export const Responsive = ({ device, as, className, children }) => {
  switch (device) {
    case MOBILE:
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
    case MOBILE_AND_TABLET:
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
    case TABLET:
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
    case TABLET_AND_DESKTOP:
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
    case DESKTOP:
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

Responsive.MOBILE = MOBILE;
Responsive.MOBILE_AND_TABLET = MOBILE_AND_TABLET;
Responsive.TABLET = TABLET;
Responsive.TABLET_AND_DESKTOP = TABLET_AND_DESKTOP;
Responsive.DESKTOP = DESKTOP;

Responsive.propTypes = {
  as: PropTypes.any,
  children: PropTypes.node,
  className: PropTypes.string,
  device: PropTypes.string
};
