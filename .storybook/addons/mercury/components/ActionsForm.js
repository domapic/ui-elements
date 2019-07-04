import React, { Component } from "react";
import PropTypes from "prop-types";

import { Form } from "@storybook/components";

import SectionTitle from "./SectionTitle";
import ActionField from "./ActionField";
import DisplayWrapper from "./DisplayWrapper";

export default class ActionsForm extends Component {
  render() {
    const { actions, onClickAction } = this.props;
    return (
      <DisplayWrapper>
        <SectionTitle>ACTIONS</SectionTitle>
        <Form>
          {actions.map(action => (
            <ActionField
              key={action.name}
              label={action.name}
              action={action}
              onClick={onClickAction}
            />
          ))}
        </Form>
      </DisplayWrapper>
    );
  }
}

ActionsForm.displayName = "ActionsForm";

ActionsForm.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.any
    })
  ).isRequired,
  onClickAction: PropTypes.func
};
