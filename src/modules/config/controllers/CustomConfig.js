import { connect } from "@xbyorange/react-mercury";

import { Component as ConfigComponent } from "../components/config";

import { customConfig } from "data/service";

export const mapDataSourceToProps = () => {
  return {
    config: customConfig.read.getters.value,
    error: customConfig.read.getters.error,
    loading: customConfig.read.getters.loading
  };
};

export const CustomConfig = connect(mapDataSourceToProps)(ConfigComponent);
