import { isEqual } from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { styled } from "@storybook/theming";
import { isArray, debounce } from "lodash";

import SourcesDisplay from "./SourcesDisplay";
import ActionsDisplay from "./ActionsDisplay";
import { parseAll } from "../sourcesParser";

const DataDisplayWrapper = styled.div({
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  overflowY: "auto"
});

const getSourcesFromData = data => {
  let sources = [];
  if (data._isSource) {
    sources.push(data);
    return sources;
  }
  if (isArray(data)) {
    data.forEach(dataItem => {
      if (dataItem._isSource) {
        sources.push(dataItem);
      }
    });
    return sources;
  }
  Object.keys(data).forEach(dataKey => {
    if (data[dataKey]._isSource) {
      sources.push(data[dataKey]);
    }
  });
  return sources;
};

const getSourcesIds = (sources = []) => sources.map(source => source._id);

export default class DataDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: []
    };
    this.onChangeSource = debounce(this.onChangeSource.bind(this), 500);
    this.onCleanSource = this.onCleanSource.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const sources = getSourcesFromData(nextProps.data);
    const sourceIds = getSourcesIds(sources);
    if(!isEqual(sourceIds, prevState.sourceIds)) {
      return {
        sourceIds,
        sources
      };
    }
    return null;
  }

  componentDidMount() {
    this.addListeners(this.state.sources);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.sources !== this.state.sources) {
      this.removeListeners(prevState.sources);
      this.addListeners(this.state.sources);
    }
  }

  componentWillUnmount() {
    this.removeListeners(this.state.sources);
  }

  removeListeners(sources) {
    sources.forEach(source => {
      source.removeChangeAnyListener(this.onChangeSource);
      source.removeCleanAnyListener(this.onCleanSource);
    });
  }

  addListeners(sources) {
    sources.forEach(source => {
      source.onChangeAny(this.onChangeSource);
      source.onCleanAny(this.onCleanSource);
      if (this.props.dispatchRead) {
        source.read();
      }
    });
  }

  onChangeSource() {
    this.setState(state => ({
      ...state
    }));
  }

  onCleanSource(cleanDetails) {
    // TODO, remove condition after mercury is fixed
    if (this.props.dispatchRead && cleanDetails.source._root) {
      const source = cleanDetails.source._queryId
        ? cleanDetails.source._root._queries[cleanDetails.source._queryId]
        : cleanDetails.source._root;
      source.read();
    }
  }

  render() {
    const { data, domains } = this.props;
    const display = parseAll(data, domains);
    return (
      <DataDisplayWrapper>
        {display.sources ? <SourcesDisplay sources={display.sources} /> : null}
        {display.actions ? <ActionsDisplay actions={display.actions} /> : null}
      </DataDisplayWrapper>
    );
  }
}

DataDisplay.displayName = "DataDisplay";

DataDisplay.propTypes = {
  data: PropTypes.any,
  dispatchRead: PropTypes.bool,
  domains: PropTypes.any
};
