import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { styled } from "@storybook/theming";
import { Placeholder } from "@storybook/components";
import { Form } from "@storybook/components";

const ErrorWrapper = styled(({ children, className }) => (
  <Placeholder horizontal vertical className={className}>
    {children}
  </Placeholder>
))({
  backgroundColor: "#fff6f6",
  color: "red",
  width: "90%",
  margin: "auto",
  marginTop: "20px"
});

const MessageWrapper = styled.div({
  marginBottom: "10px"
});

const ServerError = ({ title, message, onRetry }) => (
  <ErrorWrapper>
    <Fragment>{title}</Fragment>
    <Fragment>
      <MessageWrapper>{message}</MessageWrapper>
      {onRetry ? (
        <Form.Button type="button" onClick={onRetry}>
          Retry
        </Form.Button>
      ) : null}
    </Fragment>
  </ErrorWrapper>
);

ServerError.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
  title: PropTypes.string
};

export default ServerError;
