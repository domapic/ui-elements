import { connect } from "@xbyorange/react-mercury";

import Config from "../components/config";

import { customConfig } from "data/settings";

export const mapDataSourceToProps = () => {
  return {
    config: customConfig.read.getters.value,
    error: customConfig.read.getters.error,
    loading: customConfig.read.getters.loading
  };
};

export const CustomConfig = connect(mapDataSourceToProps)(Config);
