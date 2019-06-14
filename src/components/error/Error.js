import React from "react";
import PropTypes from "prop-types";

import { Message, Icon } from "semantic-ui-react";

export const ErrorComponent = ({ children }) => (
  <Message negative size="large" data-testid="error-message">
    <Icon name="warning sign" /> {children}
  </Message>
);

ErrorComponent.propTypes = {
  children: PropTypes.node
};
