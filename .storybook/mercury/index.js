import addons, { makeDecorator } from "@storybook/addons";

import { BOOLEAN, TEXT, NUMBER, OBJECT } from "./components/types";

import { PARAM_KEY, OPTIONS_EVENT, ACTION_EVENT } from "./shared";

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

let listener = () => {};

export const withMercury = makeDecorator({
  name: "withMercury",
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { options, parameters }) => {
    const storyOptions = parameters || options;
    const channel = addons.getChannel();

    channel.emit(OPTIONS_EVENT, storyOptions);

    channel.removeListener(ACTION_EVENT, listener);
    listener = actionDetails => {
      console.log("action details");
      console.log(actionDetails);
      parameters.actions.forEach(action => {
        if (action.name === actionDetails.name) {
          action.action(actionDetails.value);
        }
      });
    };
    channel.on(ACTION_EVENT, listener);

    return getStory(context);
  }
});
