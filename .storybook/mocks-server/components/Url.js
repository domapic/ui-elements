import PropTypes from "prop-types";
import React from "react";
import { debounce } from "lodash";

import { Form } from "@storybook/components";

export default class Url extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    this.sendChange = debounce(this.sendChange.bind(this), 500);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  sendChange(value) {
    this.props.onChange(value);
  }

  handleChange(event) {
    const { value } = event.target;

    this.setState(
      {
        value
      },
      () => {
        this.sendChange(value);
      }
    );
  }

  render() {
    return (
      <Form.Field label="Url">
        <Form.Input value={this.state.value} name="url" onChange={this.handleChange} size="flex" />
      </Form.Field>
    );
  }
}

Url.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number
};
