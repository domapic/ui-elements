import React, { Component } from "react";
import PropTypes from "prop-types";
import isPromise from "is-promise";
import Inspector from "react-inspector";
import { styled } from "@storybook/theming";

import { parseHelper, displayValue } from "./helpers";

import { DisplayErrorDetails } from "./DisplayError";
import { PromiseInspector } from "./PromiseInspector";

const HelperWrapper = styled.div({
  fontSize: "12px",
  padding: "15px",
  paddingLeft: "20px",
  paddingRight: "20px",
  minWidth: "95vw"
});

const HelperName = styled.div({
  color: "rgb(0, 0, 0)",
  borderBottom: "2px solid rgba(0,0,0,.2)",
  fontSize: "14px",
  marginBottom: "10px",
  paddingBottom: "4px"
});

const InspectorWrapper = styled.div({
  marginTop: "10px",
  marginBottom: "10px"
});

const HelperCode = styled.div({
  color: "#999",
  fontWeight: "100",
  fontStyle: "italic",
  marginTop: "10px",
  borderTop: "1px solid rgba(0,0,0,.1)",
  paddingTop: "5px"
});

const HelperInspector = ({ data, name }) => {
  const displayDetails = isPromise(data) ? (
    <PromiseInspector promise={data} />
  ) : data instanceof Error ? (
    <DisplayErrorDetails error={data} />
  ) : null;
  return (
    <InspectorWrapper>
      <Inspector theme="chromeLight" name={name} data={data} expandLevel={10} />
      {displayDetails}
    </InspectorWrapper>
  );
};

HelperInspector.propTypes = {
  data: PropTypes.any,
  name: PropTypes.string
};

export class DisplayHelper extends Component {
  render() {
    const { helper, args } = this.props;
    const { name, code } = parseHelper(helper);

    return (
      <HelperWrapper>
        <HelperName>{name}</HelperName>
        <HelperInspector data={args} name="ARGUMENTS" />
        <HelperInspector data={displayValue(helper, args)} name="RETURNS" />
        <HelperCode>{code}</HelperCode>
      </HelperWrapper>
    );
  }
}

DisplayHelper.propTypes = {
  args: PropTypes.array,
  helper: PropTypes.func.isRequired
};

DisplayHelper.displayName = "DisplayHelper";

DisplayHelper.propTypes = {
  helper: PropTypes.func.isRequired
};
