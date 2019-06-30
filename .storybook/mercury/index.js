import React from "react";
import { debounce } from "lodash";
import addons, { makeDecorator } from "@storybook/addons";

import { BOOLEAN, TEXT, NUMBER, OBJECT } from "./components/types";

import {
  PARAM_KEY,
  OPTIONS_EVENT,
  ACTION_EVENT,
  REFRESH_SOURCE_EVENT,
  CLEAN_SOURCE_EVENT
} from "./shared";

import { parseSources, parseActions } from "./sourcesParser";
import DataDisplay from "./components/DataDisplay";

const getTypeFunction = type => {
  return defaultValue => ({
    type,
    default: defaultValue
  });
};

export const text = getTypeFunction(TEXT);
export const boolean = getTypeFunction(BOOLEAN);
export const number = getTypeFunction(NUMBER);
export const object = getTypeFunction(OBJECT);

let changeAnyListener = () => {};
let listenedSources = [];

export const withMercury = makeDecorator({
  name: "withMercury",
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { options, parameters }) => {
    const storyOptions = parameters || options;
    const channel = addons.getChannel();
    const parsedActions = parseActions(storyOptions.actions, storyOptions.domains);
    const storySources = storyOptions.sources;

    channel.emit(OPTIONS_EVENT, {
      actions: parsedActions,
      sources: parseSources(storyOptions.sources, storyOptions.domains)
    });

    channel.removeAllListeners(ACTION_EVENT);
    channel.removeAllListeners(CLEAN_SOURCE_EVENT);

    listenedSources.forEach(source => {
      source.removeChangeAnyListener(changeAnyListener);
    });
    listenedSources = [];

    if (storyOptions.sources) {
      changeAnyListener = debounce(() => {
        channel.emit(
          REFRESH_SOURCE_EVENT,
          parseSources(storyOptions.sources, storyOptions.domains)
        );
      }, 500);
      storyOptions.sources.forEach(source => {
        listenedSources.push(source);
        source.onChangeAny(changeAnyListener);
      });
    }

    channel.on(ACTION_EVENT, actionDetails => {
      parsedActions.forEach(action => {
        if (action.name === actionDetails.name) {
          console.log("Sending Mercury action", actionDetails.name, actionDetails.value);
          action.action(actionDetails.value);
        }
      });
    });

    channel.on(CLEAN_SOURCE_EVENT, parsedSource => {
      storySources.forEach(source => {
        if (source._id === parsedSource.data.id) {
          console.log("Cleaning Mercury source", source._id);
          source.clean();
        }
      });
    });

    return getStory(context);
  }
});

export const Display = DataDisplay;

export const display = (data, options = {}) => {
  const displayWithDomain = context => {
    return (
      <Display
        domains={context.parameters.mercury.domains}
        data={data}
        dispatchRead={options.dispatchRead}
      />
    );
  };
  return displayWithDomain;
};
