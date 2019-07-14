import { connect } from "@xbyorange/react-mercury";

import { ConfigView } from "../views/Config";

import { customConfig } from "data/settings";

export const mapDataSourceToProps = () => {
  return {
    customConfig: customConfig.read.getters.value
  };
};

export const Config = connect(mapDataSourceToProps)(ConfigView);
