import React, { Component } from "react";
import PropTypes from "prop-types";

import { Form } from "@storybook/components";

import SelectBehavior from "./SelectBehavior";
import Delay from "./Delay";

import { connect } from "@xbyorange/react-mercury";

import { changeDelay, delay } from "../data/settings";

class SettingsForm extends Component {
  constructor(props) {
    super(props);
    this.handleChangeDelay = this.handleChangeDelay.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.delay !== this.props.delay) {
      changeDelay(nextProps.delay);
    }
  }

  handleChangeDelay(delay) {
    changeDelay(delay);
    this.props.onChangeDelay(delay);
  }

  render() {
    const { behavior, delayFromServer, onChangeBehavior } = this.props;
    return (
      <Form>
        <Delay value={delayFromServer} onChange={this.handleChangeDelay} />
        <SelectBehavior
          value={behavior}
          onChange={onChangeBehavior}
          options={["foo", "foo2", "base"]}
        />
      </Form>
    );
  }
}

SettingsForm.displayName = "SettingsForm";

SettingsForm.propTypes = {
  behavior: PropTypes.string,
  delay: PropTypes.number,
  delayFromServer: PropTypes.number,
  onChangeBehavior: PropTypes.func.isRequired,
  onChangeDelay: PropTypes.func.isRequired
};

const mapDataSourceToProps = () => ({
  delayFromServer: delay.read.getters.value
});

const ConnectedSettingsForm = connect(mapDataSourceToProps)(SettingsForm);

export default ConnectedSettingsForm;
