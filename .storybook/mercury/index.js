import addons, { makeDecorator } from "@storybook/addons";

export const withMercury = makeDecorator({
  name: "withMercury",
  parameterName: "mercury",
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel();

    channel.on("mercury/sendAction", actionName => {
      parameters.actions.forEach(action => {
        if (action.name === actionName) {
          action.action();
        }
      });
    });

    return getStory(context);
  }
});
