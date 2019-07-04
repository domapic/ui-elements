import PropTypes from "prop-types";
import React from "react";
import { debounce } from "lodash";

import { Form } from "@storybook/components";

export default class Delay extends React.Component {
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
    const { onChange } = this.props;
    let parsedValue = Number(value);

    if (!(Number.isNaN(parsedValue) || value === "")) {
      onChange(value);
    }
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
      <Form.Field label="Delay">
        <Form.Input
          value={this.state.value}
          type="number"
          name="delay"
          min={0}
          step={1000}
          onChange={this.handleChange}
          size="flex"
        />
      </Form.Field>
    );
  }
}

Delay.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number
};
