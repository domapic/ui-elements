import React, { Component } from "react";
import PropTypes from "prop-types";

import { styled } from "@storybook/theming";
import { Form } from "@storybook/components";

import TypeMap from "./types";

const InvalidType = () => <span>Invalid Type</span>;

const ButtonContainer = styled.span({
  marginLeft: "auto",
  paddingLeft: "10px",
  textAlign: "right"
});

export default class ActionField extends Component {
  constructor(props) {
    super(props);
    const defaultValue = (props.action.value && props.action.value.default) || "";
    this.state = { value: defaultValue };
    this.clickHandler = this.clickHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.action &&
      prevProps.action.value &&
      this.props.action.value &&
      prevProps.action.value.defaultValue !== this.props.action.value.defaultValue
    ) {
      this.setState({
        value: this.props.action.value.defaultValue
      });
    }
  }

  clickHandler() {
    const { onClick, action } = this.props;
    onClick({
      name: action.name,
      value: this.state.value
    });
  }

  handleChange(value) {
    this.setState({
      value
    });
  }

  render() {
    const action = this.props.action;
    const type = action.value && action.value.type;
    const InputType = TypeMap[type] || InvalidType;
    return (
      <Form.Field key={action.name} label={action.name}>
        {type ? (
          <InputType name={name} value={action.value.default} onChange={this.handleChange} />
        ) : null}
        <ButtonContainer>
          <Form.Button type="button" onClick={this.clickHandler}>
            Dispatch
          </Form.Button>
        </ButtonContainer>
      </Form.Field>
    );
  }
}

ActionField.displayName = "ActionField";

ActionField.propTypes = {
  action: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.any
  }).isRequired,
  onClick: PropTypes.func
};
