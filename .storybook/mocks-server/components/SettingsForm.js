import React, { Component } from "react";
import PropTypes from "prop-types";

import { Form } from "@storybook/components";
import { styled } from "@storybook/theming";

import SelectBehavior from "./SelectBehavior";
import Delay from "./Delay";

export default class SettingsForm extends Component {
  render() {
    const { behavior, delay, onChangeDelay, onChangeBehavior } = this.props;
    return (
      <Form>
        <Delay value={delay} onChange={onChangeBehavior} />
        <SelectBehavior value={behavior} onChange={onChangeDelay} options={["foo", "foo2", "base"]}/>
      </Form>
    );
  }
}

SettingsForm.displayName = "SettingsForm";

SettingsForm.propTypes = {
  behavior: PropTypes.string,
  delay: PropTypes.number,
  onChangeDelay: PropTypes.func.isRequired,
  onChangeBehavior: PropTypes.func.isRequired
};
