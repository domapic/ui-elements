import { configure, addDecorator, addParameters } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import { withInfo } from "@storybook/addon-info";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withConsole } from "@storybook/addon-console";

import * as legal from "../src/data/legal";

import theme from "./theme";

addParameters({
  options: {
    theme
  },
  viewport: {
    defaultViewport: "responsive",
    viewports: {
      ...INITIAL_VIEWPORTS,
      responsive: {
        name: "Responsive",
        styles: {
          width: "95%",
          height: "95%"
        }
      }
    }
  },
  mercury: {
    domains: {
      legal
    }
  }
});

addDecorator(withInfo);
addDecorator(centered);

addDecorator((storyFn, context) => withConsole()(storyFn)(context));
addParameters({
  backgrounds: [
    { name: "light", value: "#FFFFFF", default: true },
    { name: "light-dirty", value: "#F7F7F4" },
    { name: "dark", value: "#1B1C1D" }
  ]
});

const loadStories = () => {
  const req = require.context("../src", true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
