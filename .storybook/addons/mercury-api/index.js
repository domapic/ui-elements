import addons, { makeDecorator } from "@storybook/addons";

import { PARAM_KEY, OPTIONS_EVENT, CHANGE_CONFIG_EVENT, CLEAN_EVENT } from "./shared";

import { apis } from "@data-provider/axios";

let waitAndClean;
let firstConfig;

export const withMercuryApi = makeDecorator({
  name: "withMercuryApi",
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { options, parameters }) => {
    const storyOptions = parameters || options;
    const channel = addons.getChannel();

    channel.emit(OPTIONS_EVENT, {
      baseUrl: storyOptions.baseUrl
    });

    if (!firstConfig) {
      firstConfig = true;
      apis.config({
        baseUrl: storyOptions.baseUrl,
        retries: 0
      });
    }

    channel.removeAllListeners(CHANGE_CONFIG_EVENT);
    channel.removeAllListeners(CLEAN_EVENT);
    clearTimeout(waitAndClean);

    if (storyOptions.clean) {
      waitAndClean = setTimeout(() => {
        apis.clean();
      }, 500);
    }

    channel.on(CHANGE_CONFIG_EVENT, config => {
      console.log("Mercury api config", config);
      apis.config(config);
      apis.clean();
    });

    channel.on(CLEAN_EVENT, () => {
      console.log("Mercury api clean");
      apis.clean();
    });

    return getStory(context);
  }
});
