import PropTypes from "prop-types";
import React from "react";

import { Form } from "@storybook/components";

class TextType extends React.Component {
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

    this.setState({
      value
    });

    onChange(value);
  }

  render() {
    const { name } = this.props;
    return (
      <Form.Input
        value={this.state.value}
        type="text"
        name={name}
        onChange={this.handleChange}
        size="flex"
      />
    );
  }
}

TextType.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};

export default TextType;
