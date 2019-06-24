import { debounce } from "lodash";
import addons, { makeDecorator } from "@storybook/addons";

import { BOOLEAN, TEXT, NUMBER, OBJECT } from "./components/types";

import { PARAM_KEY, OPTIONS_EVENT, ACTION_EVENT, REFRESH_SOURCE_EVENT } from "./shared";

import { parseSources, parseActions } from "./sourcesParser";

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

export const withMercury = makeDecorator({
  name: "withMercury",
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { options, parameters }) => {
    const storyOptions = parameters || options;
    const channel = addons.getChannel();
    const parsedActions = parseActions(storyOptions.actions, storyOptions.domains);

    channel.emit(OPTIONS_EVENT, {
      actions: parsedActions,
      sources: parseSources(storyOptions.sources, storyOptions.domains)
    });

    channel.removeAllListeners(ACTION_EVENT);

    if (storyOptions.sources) {
      storyOptions.sources.forEach(source => {
        source.removeChangeAnyListener(changeAnyListener);
      });
      changeAnyListener = debounce(() => {
        channel.emit(
          REFRESH_SOURCE_EVENT,
          parseSources(storyOptions.sources, storyOptions.domains)
        );
      }, 500);
      storyOptions.sources.forEach(source => {
        source.onChangeAny(changeAnyListener);
      });
    }

    channel.on(ACTION_EVENT, actionDetails => {
      console.log("Mercury action", actionDetails.name, actionDetails.value);
      parsedActions.forEach(action => {
        if (action.name === actionDetails.name) {
          action.action(actionDetails.value);
        }
      });
    });

    return getStory(context);
  }
});
