import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import SectionTitle from "./SectionTitle";
import SourceInspector from "./SourceInspector";
import DisplayWrapper from "./DisplayWrapper";

import { findSelectors, findOrigins } from "../sourcesParser";

const SourcesList = ({ title, sources, onClickClean }) => {
  if (!sources.length) {
    return null;
  }
  return (
    <Fragment>
      <SectionTitle>{title}</SectionTitle>
      {sources.map(source => (
        <SourceInspector
          key={source.name || source._id || source.source._id}
          source={source}
          onClickClean={onClickClean}
        />
      ))}
    </Fragment>
  );
};

SourcesList.propTypes = {
  onClickClean: PropTypes.func,
  sources: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

export default class SourcesDisplay extends Component {
  render() {
    const { sources, onClickClean } = this.props;
    const selectors = findSelectors(sources);
    const origins = findOrigins(sources);

    return (
      <DisplayWrapper>
        <SourcesList title="ORIGINS" sources={origins} onClickClean={onClickClean} />
        <SourcesList title="SELECTORS" sources={selectors} onClickClean={onClickClean} />
      </DisplayWrapper>
    );
  }
}

SourcesDisplay.displayName = "SourcesDisplay";

SourcesDisplay.propTypes = {
  onClickClean: PropTypes.func,
  sources: PropTypes.arrayOf(PropTypes.any).isRequired
};
