import React from "react";
import PropTypes from "prop-types";
import { styled } from "@storybook/theming";
import { ScrollArea } from "@storybook/components";

import SettingsForm from "./SettingsForm";
import DisplayBehaviorController from "./DisplayBehaviorController";

const PanelWrapper = styled(({ children, className }) => (
  <ScrollArea horizontal vertical className={className}>
    {children}
  </ScrollArea>
))({
  height: "100%",
  width: "100%"
});

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      behavior: null,
      delay: null,
      url: null
    };
    this.handleChangeDelay = this.handleChangeDelay.bind(this);
    this.handleChangeBehavior = this.handleChangeBehavior.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    console.log("Getting derived state", nextProps, prevState);
    if (nextProps.delayFromServer !== prevState.delay) {
      newState.delay = nextProps.delayFromServer;
      nextProps.onChangeDelay(nextProps.delayFromServer);
      console.log("Updating delay in state");
    }
    if (nextProps.behaviorFromServer !== prevState.behavior) {
      newState.behavior = nextProps.behaviorFromServer;
      nextProps.onChangeBehavior(nextProps.behaviorFromServer);
      console.log("Updating behavior in state");
    }
    return {
      ...prevState,
      ...newState
    };
  }

  handleChangeDelay(delay) {
    this.setState(
      state => ({
        ...state,
        delay
      }),
      () => {
        this.props.onChangeDelay(delay);
      }
    );
  }

  handleChangeBehavior(behavior) {
    this.setState(
      state => ({
        ...state,
        behavior
      }),
      () => {
        this.props.onChangeBehavior(behavior);
      }
    );
  }

  render() {
    const { behavior, delay } = this.state;
    const { onChangeBehavior, onChangeDelay, behaviorsNames } = this.props;
    return (
      <PanelWrapper>
        <SettingsForm
          behavior={behavior}
          behaviorsNames={behaviorsNames}
          delay={delay}
          onChangeDelay={onChangeDelay}
          onChangeBehavior={onChangeBehavior}
        />
        <DisplayBehaviorController behavior={behavior} />
      </PanelWrapper>
    );
  }
}

Panel.propTypes = {
  behaviorFromServer: PropTypes.string,
  behaviorsNames: PropTypes.array,
  delayFromServer: PropTypes.number,
  onChangeBehavior: PropTypes.func.isRequired,
  onChangeDelay: PropTypes.func.isRequired
};

Panel.displayName = "MocksServerPanel";
