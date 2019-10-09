import React from "react";
import PropTypes from "prop-types";

import VisibilityContext from "contexts/visibility";

export class ForcedVisibility extends React.Component {
  componentDidMount() {
    if (this.context === "onTopPassed" && this.props.onTopPassed) {
      this.props.onTopPassed();
    }
    if (this.context === "onTopPassedReverse" && this.props.onTopPassedReverse) {
      this.props.onTopPassedReverse();
    }
  }

  render() {
    return this.props.children;
  }
}

ForcedVisibility.contextType = VisibilityContext;

ForcedVisibility.propTypes = {
  children: PropTypes.node,
  onTopPassed: PropTypes.func,
  onTopPassedReverse: PropTypes.func
};
