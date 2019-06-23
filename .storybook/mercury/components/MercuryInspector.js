import { isArray } from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";

import { styled } from "@storybook/theming";
import Inspector from "react-inspector";

const SourceContainer = styled.div({
  padding: "15px",
  borderBottom: "1px solid rgba(0,0,0,.1)",
  fontSize: "14px",
  li: {
    margin: "0"
  }
});

const getSourceConstructor = source => {
  var funcNameRegex = /function (.{1,})\(/;
  var results = funcNameRegex.exec(source.constructor.toString());
  return results && results.length > 1 ? results[1] : "";
};

const getQueries = (source, sourceConstructor) => {
  let queries;
  if (source._queries) {
    Object.keys(source._queries).forEach(queryName => {
      if (queryName && source._queries[queryName]._queryId) {
        queries = queries || {};
        queries[source._queries[queryName]._queryId] = parseSourceContent(
          source._queries[queryName],
          sourceConstructor
        );
      }
    });
  }
  return queries;
};

const getSources = sources => {
  return sources.map(source => {
    if (isArray(source)) {
      return getSources(source);
    }
    if (source.source) {
      let sourceObject = {
        source: parseSourceContent(source.source)
      };
      if (source.query) {
        sourceObject.query = source.query;
      }
      if (source.catch) {
        sourceObject.catch = source.catch;
      }
      return sourceObject;
    }
    return parseSourceContent(source);
  });
};

const parseSourceContent = (source, constructorName) => {
  const sourceConstructor = constructorName || getSourceConstructor(source);
  const queries = getQueries(source, sourceConstructor);
  const display = {
    id: source._id,
    type: sourceConstructor,
    read: {
      value: source.readData.value,
      error: source.readData.error,
      loading: source.readData.loading
    }
  };
  if (source._sources) {
    display.sources = getSources(source._sources);
  }
  if (source._queryId) {
    display.query = source._queryId;
  }
  if (queries) {
    display.queries = queries;
  }
  if (source._customQueries) {
    display.customQueries = source._customQueries;
  }

  return display;
};

const parseSource = source => {
  if (source.name) {
    return {
      name: source.name,
      data: parseSourceContent(source)
    };
  }
  return {
    name: source._id,
    data: parseSourceContent(source)
  };
};

export default class MercuryInspector extends Component {
  render() {
    const { source } = this.props;
    const parsedSource = parseSource(source);
    return (
      <SourceContainer>
        <Inspector theme="chromeLight" data={parsedSource.data} name={parsedSource.name} />
      </SourceContainer>
    );
  }
}

MercuryInspector.displayName = "MercuryInspector";

MercuryInspector.propTypes = {
  source: PropTypes.any.isRequired
};
