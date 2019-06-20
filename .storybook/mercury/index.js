import addons, { makeDecorator } from "@storybook/addons";

import { BOOLEAN, TEXT, NUMBER, OBJECT } from "./components/types";

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

export const withMercury = makeDecorator({
  name: "withMercury",
  parameterName: "mercury",
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel();

    channel.on("mercury/sendAction", actionDetails => {
      console.log("action details");
      console.log(actionDetails);
      parameters.actions.forEach(action => {
        if (action.name === actionDetails.name) {
          action.action(actionDetails.value);
        }
      });
    });

    return getStory(context);
  }
});
