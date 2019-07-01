import { connect } from "@xbyorange/react-mercury";

import { Component as ConfigComponent } from "../components/config";

import { baseConfig } from "data/service";

export const mapDataSourceToProps = () => {
  return {
    config: baseConfig.read.getters.value,
    error: baseConfig.read.getters.error,
    loading: baseConfig.read.getters.loading
  };
};

export const BaseConfig = connect(mapDataSourceToProps)(ConfigComponent);
