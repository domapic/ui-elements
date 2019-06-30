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
    this.handleChange = debounce(this.handleChange.bind(this), 500);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange(event) {
    const { onChange } = this.props;
    const { value } = event.target;

    let parsedValue = Number(value);

    this.setState({
      value
    });

    if (!(Number.isNaN(parsedValue) || value === "")) {
      onChange(value);
    }
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
