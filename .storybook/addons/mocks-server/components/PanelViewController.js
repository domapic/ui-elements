import { connect } from "@xbyorange/react-mercury";

import PanelView from "./PanelView";

import { delay, changeDelay, settings } from "../data/settings";
import {
  currentBehaviorName,
  behaviorsNames,
  changeBehavior,
  currentBehavior
} from "../data/behaviors";

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
    serverDelayError: delay.read.getters.error,
    serverBehavior: currentBehaviorName.read.getters.value,
    serverBehaviorLoading: currentBehaviorName.read.getters.loading,
    serverBehaviorError: currentBehaviorName.read.getters.error,
    behaviorsNames: behaviorsNames.read.getters.value,
    behaviorsNamesError: behaviorsNames.read.getters.error,
    changeBehaviorError: currentBehavior.update.getters.error,
    changeSettingsError: settings.update.getters.error
  };
};

const PanelViewController = connect(
  mapDataSourceToProps,
  props => ({
    ...props,
    serverError: props.serverDelayError || props.serverBehaviorError || props.behaviorsNamesError
  })
)(PanelView);

export default PanelViewController;
