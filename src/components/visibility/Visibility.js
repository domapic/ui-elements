import React from "react";
import PropTypes from "prop-types";
import { Visibility as SemanticVisibility } from "semantic-ui-react";

import { ForcedVisibility } from "./ForcedVisibility";

export const Visibility = ({ children, onTopPassed, onTopPassedReverse, ...rest }) => {
  return (
    <ForcedVisibility onTopPassed={onTopPassed} onTopPassedReverse={onTopPassedReverse}>
      <SemanticVisibility
        onTopPassed={onTopPassed}
        onTopPassedReverse={onTopPassedReverse}
        {...rest}
      >
        {children}
      </SemanticVisibility>
    </ForcedVisibility>
  );
};

Visibility.propTypes = {
  children: PropTypes.node,
  onTopPassed: PropTypes.func,
  onTopPassedReverse: PropTypes.func
};
