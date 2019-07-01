import React from "react";
import PropTypes from "prop-types";

import { BaseConfig } from "../controllers/BaseConfig";
import { CustomConfig } from "../controllers/CustomConfig";

export const ConfigView = ({ customConfig }) => {
  const custom = customConfig.length ? (
    <CustomConfig title="Service custom configuration" />
  ) : null;
  return (
    <React.Fragment>
      <BaseConfig title="Base configuration" />
      {custom}
    </React.Fragment>
  );
};

ConfigView.propTypes = {
  customConfig: PropTypes.array
};
