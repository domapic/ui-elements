import React, { Component } from "react";
import PropTypes from "prop-types";

import { Form, DocumentFormatting } from "@storybook/components";

import SectionTitle from "./SectionTitle";
import ActionField from "./ActionField";

export default class ActionsForm extends Component {
  render() {
    const { actions, onClickAction } = this.props;
    return (
      <DocumentFormatting>
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
      </DocumentFormatting>
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
