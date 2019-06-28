import React, { Component } from "react";
import PropTypes from "prop-types";

import { Form } from "@storybook/components";

import SelectBehavior from "./SelectBehavior";
import Delay from "./Delay";

import { changeDelay } from "../data/settings";
import { changeBehavior } from "../data/behaviors";

export default class SettingsForm extends Component {
  constructor(props) {
    super(props);
    this.handleChangeDelay = this.handleChangeDelay.bind(this);
    this.handleChangeBehavior = this.handleChangeBehavior.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.delay !== this.props.delay) {
      changeDelay(nextProps.delay);
    }
    if (nextProps.behavior !== this.props.behavior) {
      changeBehavior(nextProps.behavior);
    }
  }

  handleChangeDelay(delay) {
    changeDelay(delay);
    this.props.onChangeDelay(delay);
  }

  handleChangeBehavior(behavior) {
    changeBehavior(behavior);
    this.props.onChangeBehavior(behavior);
  }

  render() {
    const { behaviorFromServer, delayFromServer, behaviorsNames } = this.props;
    return (
      <Form>
        <Delay value={delayFromServer} onChange={this.handleChangeDelay} />
        <SelectBehavior
          value={behaviorFromServer}
          onChange={this.handleChangeBehavior}
          options={behaviorsNames}
        />
      </Form>
    );
  }
}

SettingsForm.displayName = "SettingsForm";

SettingsForm.propTypes = {
  behavior: PropTypes.string,
  behaviorFromServer: PropTypes.string,
  behaviorsNames: PropTypes.array,
  delay: PropTypes.number,
  delayFromServer: PropTypes.number,
  onChangeBehavior: PropTypes.func.isRequired,
  onChangeDelay: PropTypes.func.isRequired
};
