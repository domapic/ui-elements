import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { STORY_CHANGED } from "@storybook/core-events";
import addons, { types } from "@storybook/addons";

import { styled } from "@storybook/theming";
import { Placeholder, Link, ScrollArea } from "@storybook/components";

import ActionsForm from "./components/ActionsForm";
import { ADDON_ID, PARAM_KEY, PANEL_ID } from "./shared";

const PanelWrapper = styled(({ children, className }) => (
  <ScrollArea horizontal vertical className={className}>
    {children}
  </ScrollArea>
))({
  height: "100%",
  width: "100%"
});

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

  sendAction = ({ name, value }) => {
    const { api } = this.props;
    api.emit("mercury/sendAction", {
      name,
      value
    });
  };

  render() {
    const { actions } = this.state;
    const { active } = this.props;
    if (!active || !actions) {
      return null;
    }
    if (actions.length === 0) {
      return (
        <Placeholder>
          <Fragment>No Mercury actions found</Fragment>
          <Fragment>
            Learn how to{" "}
            <Link href="https://github.com/@xbyorange" target="_blank" withArrow>
              dynamically interact with Mercury actions
            </Link>
          </Fragment>
        </Placeholder>
      );
    }
    return (
      <Fragment>
        <PanelWrapper>
          <ActionsForm actions={actions} onClickAction={this.sendAction} />
        </PanelWrapper>
      </Fragment>
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
