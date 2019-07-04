import React, { Component } from "react";
import PropTypes from "prop-types";
import Inspector from "react-inspector";

import { DetailsTitle } from "./DetailsTitle";
import { DisplayError } from "./DisplayError";
import { DetailsWrapper } from "./DetailsWrapper";

export class PromiseInspector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      value: undefined,
      error: undefined
    };
  }

  componentDidMount() {
    this.updateValueWhenFullfilled();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.promise !== this.props.promise) {
      this.updateValueWhenFullfilled();
    }
  }

  updateValueWhenFullfilled() {
    this.setState({
      loading: true,
      value: undefined,
      error: undefined
    });
    this.props.promise
      .then(value => {
        this.setState({
          value,
          error: undefined,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          value: undefined,
          error,
          loading: false
        });
      });
  }

  render() {
    const { loading, error, value } = this.state;
    if (loading) {
      return <DetailsWrapper>Loading...</DetailsWrapper>;
    }
    if (error) {
      return (
        <DetailsWrapper>
          <DetailsTitle>Promise error message:</DetailsTitle>
          <DisplayError error={error} />
        </DetailsWrapper>
      );
    }
    return (
      <DetailsWrapper>
        <Inspector theme="chromeLight" name="Promise result" data={value} expandLevel={10} />
      </DetailsWrapper>
    );
  }
}

PromiseInspector.propTypes = {
  promise: PropTypes.instanceOf(Promise)
};
