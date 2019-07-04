import React, { Component } from "react";
import PropTypes from "prop-types";

import { Form } from "@storybook/components";

import SelectBehavior from "./SelectBehavior";
import Delay from "./Delay";

export default class SettingsForm extends Component {
  render() {
    const { behavior, delay, behaviorsNames, onChangeBehavior, onChangeDelay } = this.props;
    return (
      <Form>
        <Delay value={delay} onChange={onChangeDelay} />
        <SelectBehavior value={behavior} onChange={onChangeBehavior} options={behaviorsNames} />
      </Form>
    );
  }
}

SettingsForm.displayName = "SettingsForm";

SettingsForm.propTypes = {
  behavior: PropTypes.string,
  behaviorsNames: PropTypes.array,
  delay: PropTypes.number,
  onChangeBehavior: PropTypes.func.isRequired,
  onChangeDelay: PropTypes.func.isRequired
};
