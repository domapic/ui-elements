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
      delay: 0
    };
    this.setOptions = this.setOptions.bind(this);
    this.sendDelay = this.sendDelay.bind(this);
    this.sendBehavior = this.sendBehavior.bind(this);
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
    if (options && (options.behavior || options.delay || options.url)) {
      const { behavior, delay, url } = options;
      const newState = {};
      if (behavior && behavior !== this.state.behavior) {
        newState.behavior = behavior;
      }
      if (url && url !== this.state.url) {
        const config = {
          baseUrl: url
        };
        settings.config(config);
        behaviors.config(config);
        currentBehavior.config(config);
      }
      if (delay && delay !== this.state.delay) {
        newState.delay = delay;
      }
      this.setState(state => ({
        ...state,
        ...newState
      }));
    }
  }

  sendDelay(delay) {
    const { api } = this.props;
    api.emit(CHANGE_DELAY_EVENT, delay);
  }

  sendBehavior(behavior) {
    const { api } = this.props;
    api.emit(CHANGE_BEHAVIOR_EVENT, behavior);
  }

  render() {
    const { behavior, delay } = this.state;
    const { active } = this.props;
    console.log("Rendering main panel", behavior, delay);
    if (!active || !behavior || isNil(delay)) {
      return null;
    }
    return (
      <PanelViewController
        behavior={behavior}
        delay={delay}
        onChangeDelay={this.sendDelay}
        onChangeBehavior={this.sendBehavior}
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
