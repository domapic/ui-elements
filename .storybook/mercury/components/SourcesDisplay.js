import React, { Component } from "react";
import PropTypes from "prop-types";

import { DocumentFormatting } from "@storybook/components";

import SectionTitle from "./SectionTitle";
import MercuryInspector from "./MercuryInspector";

export default class SourcesDisplay extends Component {
  render() {
    const { sources } = this.props;
    return (
      <DocumentFormatting>
        <SectionTitle>SOURCES</SectionTitle>
        {sources.map(source => (
          <MercuryInspector key={source.name || source._id || source.source._id} source={source} />
        ))}
      </DocumentFormatting>
    );
  }
}

SourcesDisplay.displayName = "SourcesDisplay";

SourcesDisplay.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.any).isRequired
};
