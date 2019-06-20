import PropTypes from "prop-types";
import React from "react";

import { Form } from "@storybook/components";

class NumberType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { onChange } = this.props;
    const { value } = event.target;

    let parsedValue = Number(value);

    this.setState({
      value
    });

    if (Number.isNaN(parsedValue) || value === "") {
      parsedValue = null;
    }

    onChange(parsedValue);
  }

  render() {
    const { name } = this.props;
    return (
      <Form.Input
        value={this.state.value}
        type="number"
        name={name}
        onChange={this.handleChange}
        size="flex"
      />
    );
  }
}

NumberType.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number
};

export default NumberType;
