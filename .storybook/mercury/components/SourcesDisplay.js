import React, { Component } from "react";
import PropTypes from "prop-types";

import SectionTitle from "./SectionTitle";
import SourceInspector from "./SourceInspector";
import DisplayWrapper from "./DisplayWrapper";

export default class SourcesDisplay extends Component {
  render() {
    const { sources } = this.props;
    return (
      <DisplayWrapper>
        <SectionTitle>SOURCES</SectionTitle>
        {sources.map(source => (
          <SourceInspector key={source.name || source._id || source.source._id} source={source} />
        ))}
      </DisplayWrapper>
    );
  }
}

SourcesDisplay.displayName = "SourcesDisplay";

SourcesDisplay.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.any).isRequired
};
