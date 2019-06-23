import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "@storybook/components";

class ObjectType extends Component {
  constructor(props) {
    super(props);
    try {
      this.state = {
        value: JSON.stringify(props.value, null, 2),
        failed: false,
        json: props.value
      };
    } catch (e) {
      this.state = { value: "Object cannot be stringified", failed: true };
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    const { onChange } = this.props;

    try {
      const json = JSON.parse(value.trim());
      this.setState({
        value,
        json,
        failed: false
      });
      onChange(json);
    } catch (err) {
      this.setState({
        value,
        failed: true
      });
    }
  }

  render() {
    const { value, failed } = this.state;
    const { name } = this.props;

    return (
      <Form.Textarea
        name={name}
        valid={failed ? "error" : null}
        value={value}
        onChange={this.handleChange}
        size="flex"
      />
    );
  }
}

ObjectType.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any
};

export default ObjectType;
