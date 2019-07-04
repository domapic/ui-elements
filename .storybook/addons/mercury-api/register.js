import React from "react";
import PropTypes from "prop-types";
import addons, { types } from "@storybook/addons";

import ConfigForm from "./components/ConfigForm";

import { ADDON_ID, PANEL_ID, OPTIONS_EVENT, CHANGE_CONFIG_EVENT, CLEAN_EVENT } from "./shared";

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseUrl: null
    };
    this.setOptions = this.setOptions.bind(this);
    this.sendConfig = this.sendConfig.bind(this);
    this.sendClean = this.sendClean.bind(this);
  }

  componentDidMount() {
    const { api } = this.props;
    api.on(OPTIONS_EVENT, this.setOptions);
  }

  componentWillUnmount() {
    const { api } = this.props;
    api.off(OPTIONS_EVENT, this.setOptions);
  }

  sendRendered() {
    console.log("RENDEREDEDEEED!");
  }

  setOptions(options) {
    if (options && options.baseUrl) {
      const { baseUrl } = options;
      const newState = {};
      if (baseUrl && baseUrl !== this.state.baseUrl) {
        newState.baseUrl = baseUrl;
      }
      this.setState(state => ({
        ...state,
        ...newState
      }));
    }
  }

  sendConfig(config) {
    const { api } = this.props;
    api.emit(CHANGE_CONFIG_EVENT, config);
  }

  sendClean() {
    const { api } = this.props;
    api.emit(CLEAN_EVENT);
  }

  render() {
    const { baseUrl } = this.state;
    const { active } = this.props;
    if (!baseUrl) {
      return null;
    }
    return (
      <ConfigForm
        baseUrl={baseUrl}
        onChange={this.sendConfig}
        onClean={this.sendClean}
        active={active}
      />
    );
  }
}

Panel.propTypes = {
  active: PropTypes.bool,
  api: PropTypes.any
};

Panel.displayName = "MercuryApiRegister";

addons.register(ADDON_ID, api => {
  const render = ({ active }) => <Panel api={api} active={active} />;

  render.propTypes = {
    active: PropTypes.bool
  };

  const title = "Mercury Api";

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title,
    render
  });
});
