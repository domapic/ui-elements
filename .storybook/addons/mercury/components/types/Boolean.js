import PropTypes from "prop-types";
import React from "react";

import { styled } from "@storybook/theming";

const Input = styled.input({
  display: "table-cell",
  boxSizing: "border-box",
  verticalAlign: "top",
  height: 21,
  outline: "none",
  border: "1px solid #ececec",
  fontSize: "12px",
  color: "#555"
});

class BooleanType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.value
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      checked: event.target.checked
    });
    this.props.onChange(event.target.checked);
  }

  render() {
    const { name } = this.props;
    return (
      <Input
        id={name}
        name={name}
        type="checkbox"
        onChange={this.handleChange}
        checked={this.state.checked}
      />
    );
  }
}

BooleanType.defaultProps = {
  name: "",
  onChange: value => value
};

BooleanType.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.bool
};

export default BooleanType;
