import React from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withConsole } from "@storybook/addon-console";

addDecorator(storyFn => <div style={{ textAlign: "center", padding: "20px" }}>{storyFn()}</div>);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));
addParameters({
  backgrounds: [
    { name: "dark", value: "#000000" },
    { name: "light", value: "#ffffff", default: true }
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
