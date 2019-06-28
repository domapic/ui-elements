import addons, { makeDecorator } from "@storybook/addons";

import { PARAM_KEY, OPTIONS_EVENT, CHANGE_DELAY_EVENT, CHANGE_BEHAVIOR_EVENT } from "./shared";

export const withMocksServer = makeDecorator({
  name: "withMocksServer",
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { options, parameters }) => {
    const storyOptions = parameters || options;
    const channel = addons.getChannel();

    channel.emit(OPTIONS_EVENT, {
      behavior: storyOptions.behavior,
      delay: storyOptions.delay,
      url: storyOptions.url
    });

    channel.removeAllListeners(CHANGE_DELAY_EVENT);
    channel.removeAllListeners(CHANGE_BEHAVIOR_EVENT);

    channel.on(CHANGE_DELAY_EVENT, delay => {
      console.log("Mocks server delay", delay);
    });

    channel.on(CHANGE_BEHAVIOR_EVENT, behavior => {
      console.log("Mocks server behavior", behavior);
    });

    return getStory(context);
  }
});
