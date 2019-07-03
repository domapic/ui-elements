import React from "react";
import PropTypes from "prop-types";
import { styled } from "@storybook/theming";

import { DetailsWrapper } from "./DetailsWrapper";
import { DetailsTitle } from "./DetailsTitle";

const DisplayErrorWrapper = styled.span({
  color: "red"
});

export const DisplayError = ({ error }) => {
  return <DisplayErrorWrapper>{error.message}</DisplayErrorWrapper>;
};

DisplayError.propTypes = {
  error: PropTypes.instanceOf(Error)
};

export const DisplayErrorDetails = ({ error }) => {
  return (
    <DetailsWrapper>
      <DetailsTitle>Error message:</DetailsTitle>
      <DisplayError error={error} />
    </DetailsWrapper>
  );
};

DisplayErrorDetails.propTypes = {
  error: PropTypes.instanceOf(Error)
};
