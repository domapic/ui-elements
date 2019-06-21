import React, { Component } from "react";
import PropTypes from "prop-types";

import { styled } from "@storybook/theming";
import { Form, DocumentFormatting } from "@storybook/components";

import TypeMap from "./types";

const InvalidType = () => <span>Invalid Type</span>;

const Section = styled.div({
  padding: "15px",
  borderBottom: "2px solid rgba(0,0,0,.2)",
  color: "rgba(0,0,0,.5)",
  fontSize: "14px",
  fontWeight: "700"
});

class ActionField extends Component {
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
        <Form.Button type="button" onClick={this.clickHandler}>
          Dispatch
        </Form.Button>
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

export default class ActionsForm extends Component {
  render() {
    const { actions, onClickAction } = this.props;
    return (
      <DocumentFormatting>
        <Section>ACTIONS</Section>
        <Form>
          {actions.map(action => (
            <ActionField
              key={action.name}
              label={action.name}
              action={action}
              onClick={onClickAction}
            />
          ))}
        </Form>
      </DocumentFormatting>
    );
  }
}

ActionsForm.displayName = "ActionsForm";

ActionsForm.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.any
    })
  ).isRequired,
  onClickAction: PropTypes.func
};
