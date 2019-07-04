import React, { Component } from "react";
import PropTypes from "prop-types";
import Inspector from "react-inspector";
import { styled } from "@storybook/theming";

const DisplayWrapper = styled.div({
  fontSize: "12px",
  padding: "15px",
  paddingLeft: "20px",
  paddingRight: "20px",
  minWidth: "95vw"
});

const ContextName = styled.div({
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

export class DisplayContext extends Component {
  render() {
    const { Context, name } = this.props;
    return (
      <DisplayWrapper>
        <ContextName>{name} context</ContextName>
        <Context.Consumer>
          {defaultValue => {
            return (
              <InspectorWrapper>
                <Inspector
                  theme="chromeLight"
                  name="Default value"
                  data={defaultValue}
                  expandLevel={10}
                />
              </InspectorWrapper>
            );
          }}
        </Context.Consumer>
      </DisplayWrapper>
    );
  }
}

DisplayContext.propTypes = {
  Context: PropTypes.func,
  name: PropTypes.string
};

DisplayContext.displayName = "DisplayContext";
