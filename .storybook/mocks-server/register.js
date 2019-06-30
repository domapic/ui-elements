import React from "react";
import PropTypes from "prop-types";
import addons, { types } from "@storybook/addons";
import { isNil } from "lodash";

import PanelViewController from "./components/PanelViewController";

import { settings } from "./data/settings";
import { behaviors, currentBehavior } from "./data/behaviors";

import {
  ADDON_ID,
  PANEL_ID,
  OPTIONS_EVENT,
  CHANGE_BEHAVIOR_EVENT,
  CHANGE_DELAY_EVENT
} from "./shared";

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      behavior: null,
      delay: null,
      errorMessage: ""
    };
    this.setOptions = this.setOptions.bind(this);
    this.sendDelay = this.sendDelay.bind(this);
    this.sendBehavior = this.sendBehavior.bind(this);
    this.configOrigins = this.configOrigins.bind(this);
    this.cleanServerData = this.cleanServerData.bind(this);
  }

  componentDidMount() {
    const { api } = this.props;
    api.on(OPTIONS_EVENT, this.setOptions);
  }

  componentWillUnmount() {
    const { api } = this.props;
    api.off(OPTIONS_EVENT, this.setOptions);
  }

  setOptions(options) {
    if (
      options &&
      (options.behavior || !isNil(options.delay) || options.url || options.errorMessage)
    ) {
      const { behavior, delay, url, errorMessage } = options;
      const newState = {};
      if (behavior && behavior !== this.state.behavior) {
        newState.behavior = behavior;
      }
      if (errorMessage && errorMessage !== this.state.errorMessage) {
        newState.errorMessage = errorMessage;
      }
      if (url && url !== this.state.url) {
        newState.url = url;
        this.configOrigins(url);
      }
      if (!isNil(delay) && delay !== this.state.delay) {
        newState.delay = delay;
      }
      this.setState(state => ({
        ...state,
        ...newState
      }));
    }
  }

  configOrigins(url) {
    const config = {
      baseUrl: url,
      retries: 0
    };
    settings.config(config);
    behaviors.config(config);
    currentBehavior.config(config);
    this.cleanServerData();
  }

  sendDelay(delay) {
    const { api } = this.props;
    api.emit(CHANGE_DELAY_EVENT, delay);
  }

  sendBehavior(behavior) {
    const { api } = this.props;
    api.emit(CHANGE_BEHAVIOR_EVENT, behavior);
  }

  cleanServerData() {
    settings.clean();
    behaviors.clean();
    currentBehavior.clean();
  }

  render() {
    const { behavior, delay, url, errorMessage } = this.state;
    const { active } = this.props;
    if (!url) {
      return null;
    }
    return (
      <PanelViewController
        behavior={behavior}
        delay={delay}
        onChangeDelay={this.sendDelay}
        onChangeBehavior={this.sendBehavior}
        errorMessage={errorMessage}
        onErrorRetry={this.cleanServerData}
        active={active}
        url={url}
        onChangeUrl={this.configOrigins}
      />
    );
  }
}

Panel.propTypes = {
  active: PropTypes.bool,
  api: PropTypes.any
};

Panel.displayName = "MocksServerRegister";

addons.register(ADDON_ID, api => {
  const render = ({ active }) => <Panel api={api} active={active} />;

  render.propTypes = {
    active: PropTypes.bool
  };

  const title = "Mocks Server";

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title,
    render
  });
});
