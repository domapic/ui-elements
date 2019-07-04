import DisplayBehavior from "./DisplayBehavior";

import { connect } from "@xbyorange/react-mercury";

import { behaviorFixturesDisplay } from "../data/behaviors";

const mapDataSourceToProps = ({ behavior }) => ({
  fixtures: behaviorFixturesDisplay.query(behavior).read.getters.value
});

const DisplayBehaviorController = connect(mapDataSourceToProps)(DisplayBehavior);

export default DisplayBehaviorController;
