import React from "react";
import PropTypes from "prop-types";
import { STORY_CHANGED } from "@storybook/core-events";
import addons, { types } from "@storybook/addons";

const ADDON_ID = "mercury";
const PARAM_KEY = "mercury";
const PANEL_ID = `${ADDON_ID}/panel`;

class MercuryPanel extends React.Component {
  constructor(props) {
    super(props);
    this.sendAction = this.sendAction.bind(this);
  }

  state = { actions: [] };

  componentDidMount() {
    const { api } = this.props;
    api.on(STORY_CHANGED, this.onStoryChange);
  }

  componentWillUnmount() {
    const { api } = this.props;
    api.off(STORY_CHANGED, this.onStoryChange);
  }

  onStoryChange = id => {
    const { api } = this.props;
    const params = api.getParameters(id, PARAM_KEY);
    if (params && !params.disable) {
      const actions = params.actions;
      this.setState({ actions });
    } else {
      this.setState({ actions: [] });
    }
  };

  sendAction = name => {
    const { api } = this.props;
    api.emit("mercury/sendAction", name);
  };

  render() {
    const { actions } = this.state;
    const { active } = this.props;
    if (!active) {
      return null;
    }
    return (
      <div>
        {actions.map(action => {
          return (
            <div key={action.name}>
              {action.name}{" "}
              <button
                onClick={() => {
                  this.sendAction(action.name);
                }}
              >
                Send
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

MercuryPanel.propTypes = {
  active: PropTypes.bool,
  api: PropTypes.any
};

addons.register(ADDON_ID, api => {
  const render = ({ active }) => <MercuryPanel api={api} active={active} />;

  render.propTypes = {
    active: PropTypes.bool
  };

  const title = "Mercury";

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title,
    render
  });
});
