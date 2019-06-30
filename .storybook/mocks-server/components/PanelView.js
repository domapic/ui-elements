import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { styled } from "@storybook/theming";
import { ScrollArea } from "@storybook/components";
import { isNil } from "lodash";

import SettingsForm from "./SettingsForm";
import DisplayBehaviorController from "./DisplayBehaviorController";
import ServerError from "./ServerError";

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

  updateServerError(changeBehaviorError, changeSettingsError) {
    const errors = [];
    if (changeBehaviorError) {
      errors.push(`Error changing current behavior: ${changeBehaviorError.message}`);
    }
    if (changeSettingsError) {
      errors.push(`Error changing settings: ${changeSettingsError.message}`);
    }
    if (errors.length) {
      return errors.map(error => <div key={error}>{error}</div>);
    }
    return null;
  }

  render() {
    const { selectedBehavior, selectedDelay } = this.state;
    const {
      behaviorsNames,
      active,
      serverError,
      errorMessage,
      onErrorRetry,
      changeBehaviorError,
      changeSettingsError
    } = this.props;
    const hasToRenderForm = !serverError && !isNil(selectedDelay) && selectedBehavior;
    const updateServerError = this.updateServerError(changeBehaviorError, changeSettingsError);
    if (!active) {
      return null;
    }
    return (
      <PanelWrapper>
        {serverError ? (
          <ServerError
            title="Mocks Server not reachable"
            message={errorMessage}
            onRetry={onErrorRetry}
          />
        ) : null}
        {updateServerError ? (
          <ServerError title="Error updating server settings" message={updateServerError} />
        ) : null}
        {hasToRenderForm ? (
          <Fragment>
            <SettingsForm
              behavior={selectedBehavior}
              behaviorsNames={behaviorsNames}
              delay={selectedDelay}
              onChangeDelay={this.handleChangeDelay}
              onChangeBehavior={this.handleChangeBehavior}
            />
            <DisplayBehaviorController behavior={selectedBehavior} />
          </Fragment>
        ) : null}
      </PanelWrapper>
    );
  }
}

Panel.propTypes = {
  active: PropTypes.bool,
  behavior: PropTypes.string,
  behaviorsNames: PropTypes.array,
  changeBehaviorError: PropTypes.instanceOf(Error),
  changeSettingsError: PropTypes.instanceOf(Error),
  delay: PropTypes.number,
  errorMessage: PropTypes.string,
  onChangeBehavior: PropTypes.func.isRequired,
  onChangeDelay: PropTypes.func.isRequired,
  onErrorRetry: PropTypes.func.isRequired,
  serverBehavior: PropTypes.string,
  serverBehaviorLoading: PropTypes.bool,
  serverDelay: PropTypes.number,
  serverDelayLoading: PropTypes.bool,
  serverError: PropTypes.instanceOf(Error)
};

Panel.displayName = "MocksServerPanel";
