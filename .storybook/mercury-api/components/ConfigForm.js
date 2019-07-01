import React, { Component } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

import { Form } from "@storybook/components";

export default class ConfigForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseUrl: null,
      customBaseUrl: null
    };
    this.handleChange = debounce(this.handleChange.bind(this), 500);
    this.handleBaseUrlChange = this.handleBaseUrlChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    // BaseUrl story option has changed
    if (nextProps.baseUrl && nextProps.baseUrl !== prevState.baseUrl) {
      newState.baseUrl = nextProps.baseUrl;
      newState.customBaseUrl = nextProps.baseUrl;
    }

    return {
      ...prevState,
      ...newState
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.customBaseUrl !== this.state.customBaseUrl &&
      this.state.customBaseUrl &&
      this.state.customBaseUrl.length
    ) {
      this.handleChange();
    }
  }

  handleChange() {
    this.props.onChange({
      baseUrl: this.state.customBaseUrl
    });
  }

  handleBaseUrlChange(event) {
    this.setState({
      customBaseUrl: event.target.value
    });
  }

  render() {
    const { customBaseUrl } = this.state;
    const { active, onClean } = this.props;
    if (!active) {
      return null;
    }
    return (
      <Form>
        <Form.Field label="baseUrl">
          <Form.Input
            value={customBaseUrl}
            type="text"
            name="baseUrl"
            onChange={this.handleBaseUrlChange}
            size="flex"
          />
        </Form.Field>
        <Form.Field label="Clean all">
          <Form.Button type="button" onClick={onClean}>
            Clean
          </Form.Button>
        </Form.Field>
      </Form>
    );
  }
}

ConfigForm.displayName = "ConfigForm";

ConfigForm.propTypes = {
  active: PropTypes.bool,
  baseUrl: PropTypes.string,
  onChange: PropTypes.func,
  onClean: PropTypes.func
};
