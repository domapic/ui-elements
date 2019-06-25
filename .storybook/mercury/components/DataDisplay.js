import React, { Component } from "react";
import PropTypes from "prop-types";
import { styled } from "@storybook/theming";

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

export default class DataDisplay extends Component {
  render() {
    const { data, domains } = this.props;
    const display = parseAll(data, domains);
    return (
      <DataDisplayWrapper>
        {display.sources ? <SourcesDisplay sources={display.sources} autoRefresh={true} /> : null}
        {display.actions ? <ActionsDisplay actions={display.actions} /> : null}
      </DataDisplayWrapper>
    );
  }
}

DataDisplay.displayName = "DataDisplay";

DataDisplay.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  domains: PropTypes.any
};
