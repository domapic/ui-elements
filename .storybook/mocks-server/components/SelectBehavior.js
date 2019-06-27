import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form } from '@storybook/components';

export default class SelectBehavior extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.value !== this.props.value){
      this.setState({value: nextProps.value });
    }
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({
      value
    });
    this.props.onChange(value);
  }

  render() {
    const { options, onChange } = this.props;
    const { value } = this.state;

    return (
      <Form.Field label="Behavior">
        <Form.Select
          value={value}
          name="behavior"
          onChange={this.handleChange}
          size="flex"
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Form.Select>
      </Form.Field>
    );
  }
}

SelectBehavior.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
