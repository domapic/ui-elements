import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { STORY_CHANGED } from "@storybook/core-events";
import addons, { types } from "@storybook/addons";

import { styled } from "@storybook/theming";
import { Placeholder, Link, ScrollArea } from "@storybook/components";

import ActionsForm from "./components/ActionsForm";
import { ADDON_ID, PARAM_KEY, PANEL_ID, ACTION_EVENT, OPTIONS_EVENT } from "./shared";

const PanelWrapper = styled(({ children, className }) => (
  <ScrollArea horizontal vertical className={className}>
    {children}
  </ScrollArea>
))({
  height: "100%",
  width: "100%"
});

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: []
    };
    this.sendAction = this.sendAction.bind(this);
    this.setOptions = this.setOptions.bind(this);
    this.onStoryChange = this.onStoryChange.bind(this);
  }

  componentDidMount() {
    const { api } = this.props;
    api.on(OPTIONS_EVENT, this.setOptions);
    api.on(STORY_CHANGED, this.onStoryChange);
  }

  componentWillUnmount() {
    const { api } = this.props;
    api.off(OPTIONS_EVENT, this.setOptions);
    api.off(STORY_CHANGED, this.onStoryChange);
  }

  onStoryChange(id) {
    const { api } = this.props;
    const params = api.getParameters(id, PARAM_KEY);
    if (!params || !params.disable) {
      this.setState({ actions: [] });
    }
  }

  setOptions(options) {
    console.log("options---------");
    console.log(options);
    if (options) {
      const { actions } = options;
      this.setState({ actions });
    }
  }

  sendAction({ name, value }) {
    const { api } = this.props;
    api.emit(ACTION_EVENT, {
      name,
      value
    });
  }

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

Panel.propTypes = {
  active: PropTypes.bool,
  api: PropTypes.any
};

Panel.displayName = "MercuryPanel";

addons.register(ADDON_ID, api => {
  const render = ({ active }) => <Panel api={api} active={active} />;

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
