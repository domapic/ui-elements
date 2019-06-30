import { connect } from "@xbyorange/react-mercury";

import PanelView from "./PanelView";

import { delay, changeDelay } from "../data/settings";
import { currentBehaviorName, behaviorsNames, changeBehavior } from "../data/behaviors";

const mapDataSourceToProps = ({ onChangeDelay, onChangeBehavior }) => {
  const updateDelay = delay => {
    changeDelay(delay);
    onChangeDelay(delay);
  };

  const updateBehavior = behavior => {
    changeBehavior(behavior);
    onChangeBehavior(behavior);
  };

  return {
    onChangeDelay: updateDelay,
    onChangeBehavior: updateBehavior,
    serverDelay: delay.read.getters.value,
    serverDelayLoading: delay.read.getters.loading,
    serverBehavior: currentBehaviorName.read.getters.value,
    serverBehaviorLoading: currentBehaviorName.read.getters.loading,
    behaviorsNames: behaviorsNames.read.getters.value
  };
};

const PanelViewController = connect(mapDataSourceToProps)(PanelView);

export default PanelViewController;
