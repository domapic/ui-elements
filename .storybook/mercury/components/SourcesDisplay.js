import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import SectionTitle from "./SectionTitle";
import SourceInspector from "./SourceInspector";
import DisplayWrapper from "./DisplayWrapper";

import { findSelectors, findOrigins } from "../sourcesParser";

const SourcesList = ({ title, sources}) => {
  if(!sources.length) {
    return null;
  }
  return (
    <Fragment>
    <SectionTitle>{title}</SectionTitle>
      {sources.map(source => (
        <SourceInspector key={source.name || source._id || source.source._id} source={source} />
      ))}
    </Fragment>
    );
}

SourcesList.propTypes = {
  title: PropTypes.string.isRequired,
  sources: PropTypes.array.isRequired
}

export default class SourcesDisplay extends Component {
  render() {
    const { sources } = this.props;
    const selectors = findSelectors(sources);
    const origins = findOrigins(sources);

    return (
      <DisplayWrapper>
        <SourcesList title="ORIGINS" sources={origins} />
        <SourcesList title="SELECTORS" sources={selectors} />
      </DisplayWrapper>
    );
  } 
}

SourcesDisplay.displayName = "SourcesDisplay";

SourcesDisplay.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.any).isRequired
};
