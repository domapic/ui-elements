import React, { Component } from "react";
import PropTypes from "prop-types";
import { styled } from "@storybook/theming";

import SectionTitle from "./SectionTitle";
import DisplayWrapper from "./DisplayWrapper";

const ActionWrapper = styled.div({
  fontSize: "12px",
  borderBottom: "1px solid rgba(0,0,0,.1)",
  padding: "15px"
});

const ActionName = styled.span({
  marginRight: "14px",
  color: "rgb(136, 19, 145)"
});

const ActionCode = styled.span({
  color: "#999",
  fontWeight: "100",
  fontStyle: "italic"
});

const ActionDisplay = ({ name, code }) => (
  <ActionWrapper>
    <ActionName>{name}</ActionName>
    <ActionCode>{code}</ActionCode>
  </ActionWrapper>
);

ActionDisplay.displayName = "ActionDisplay";

ActionDisplay.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default class ActionsDisplay extends Component {
  render() {
    const { actions } = this.props;
    return (
      <DisplayWrapper>
        <SectionTitle>ACTIONS</SectionTitle>
        {actions.map(action => {
          return <ActionDisplay key={action.name} name={action.name} code={action.code} />;
        })}
      </DisplayWrapper>
    );
  }
}

ActionsDisplay.displayName = "ActionsDisplay";

ActionsDisplay.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.any).isRequired
};
