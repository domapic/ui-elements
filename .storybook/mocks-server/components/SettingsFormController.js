import SettingsForm from "./SettingsForm";

import { connect } from "@xbyorange/react-mercury";

import { delay } from "../data/settings";
import { currentBehaviorName, behaviorsNames } from "../data/behaviors";

const mapDataSourceToProps = () => ({
  delayFromServer: delay.read.getters.value,
  behaviorFromServer: currentBehaviorName.read.getters.value,
  behaviorsNames: behaviorsNames.read.getters.value
});

const SettingsFormController = connect(mapDataSourceToProps)(SettingsForm);

export default SettingsFormController;
