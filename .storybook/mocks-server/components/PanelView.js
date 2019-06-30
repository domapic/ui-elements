import React from "react";
import PropTypes from "prop-types";
import { styled } from "@storybook/theming";
import { ScrollArea } from "@storybook/components";
import { isNil } from "lodash";

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
      selectedBehavior: null,
      serverBehavior: null,
      delay: null,
      selectedDelay: null,
      url: null
    };
    this.handleChangeDelay = this.handleChangeDelay.bind(this);
    this.handleChangeBehavior = this.handleChangeBehavior.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    console.log("start ---------------");
    console.log("Getting derived state");
    console.log("next props", nextProps);
    console.log("prev state", prevState);
    // Delay story option has changed
    if (
      !isNil(nextProps.serverDelay) &&
      !nextProps.serverDelayLoading &&
      nextProps.delay !== prevState.delay
    ) {
      newState.delay = nextProps.delay;
      if (nextProps.delay !== prevState.selectedDelay) {
        newState.selectedDelay = nextProps.delay;
      }
      nextProps.onChangeDelay(nextProps.delay);
    }

    // Behavior story option has changed
    if (
      nextProps.serverBehavior &&
      !nextProps.serverBehaviorLoading &&
      nextProps.behavior !== prevState.behavior
    ) {
      newState.behavior = nextProps.behavior;
      if (nextProps.behavior !== prevState.selectedBehavior) {
        newState.selectedBehavior = nextProps.behavior;
      }
      nextProps.onChangeBehavior(nextProps.behavior);
    }
    return {
      ...prevState,
      ...newState
    };
  }

  handleChangeDelay(selectedDelay) {
    if (selectedDelay.length) {
      const newDelay = parseInt(selectedDelay);
      this.setState(
        state => ({
          ...state,
          selectedDelay: newDelay
        }),
        () => {
          this.props.onChangeDelay(selectedDelay);
        }
      );
    }
  }

  handleChangeBehavior(selectedBehavior) {
    this.setState(
      state => ({
        ...state,
        selectedBehavior
      }),
      () => {
        this.props.onChangeBehavior(selectedBehavior);
      }
    );
  }

  render() {
    const { selectedBehavior, selectedDelay } = this.state;
    const { behaviorsNames, active } = this.props;
    if (!active || isNil(selectedDelay) || !selectedBehavior) {
      return null;
    }
    return (
      <PanelWrapper>
        <SettingsForm
          behavior={selectedBehavior}
          behaviorsNames={behaviorsNames}
          delay={selectedDelay}
          onChangeDelay={this.handleChangeDelay}
          onChangeBehavior={this.handleChangeBehavior}
        />
        <DisplayBehaviorController behavior={selectedBehavior} />
      </PanelWrapper>
    );
  }
}

Panel.propTypes = {
  active: PropTypes.bool,
  behavior: PropTypes.string,
  behaviorsNames: PropTypes.array,
  delay: PropTypes.number,
  onChangeBehavior: PropTypes.func.isRequired,
  onChangeDelay: PropTypes.func.isRequired,
  serverBehavior: PropTypes.string,
  serverBehaviorLoading: PropTypes.bool,
  serverDelay: PropTypes.number,
  serverDelayLoading: PropTypes.bool
};

Panel.displayName = "MocksServerPanel";
