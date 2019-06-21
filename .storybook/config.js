import React from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withConsole } from "@storybook/addon-console";

import theme from "./theme";

addParameters({
  options: {
    theme
  }
});

addDecorator(withInfo);
addDecorator(storyFn => <div style={{ textAlign: "center", padding: "20px" }}>{storyFn()}</div>);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));
addParameters({
  backgrounds: [
    { name: "light", value: "#FFFFFF", default: true },
    { name: "light-dirty", value: "#F7F7F4" },
    { name: "dark", value: "#1B1C1D" }
  ]
});
addParameters({
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
  }
});

const loadStories = () => {
  const req = require.context("../src", true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
