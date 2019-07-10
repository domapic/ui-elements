import React from "react";
import PropTypes from "prop-types";
import { Placeholder } from "semantic-ui-react";

export const PlaceholderArea = ({ children }) => <Placeholder>{children}</Placeholder>;

PlaceholderArea.propTypes = {
  children: PropTypes.node
};

PlaceholderArea.displayName = "ContentPlaceholder";
