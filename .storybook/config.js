import { configure, addDecorator, addParameters } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import { withInfo } from "@storybook/addon-info";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withConsole } from "@storybook/addon-console";
import { withMocksServer } from "./mocks-server";

import * as legalData from "../src/data/legal";
import * as serviceData from "../src/data/service";

import theme from "./theme";

addParameters({
  options: {
    theme
  },
  backgrounds: [
    { name: "light", value: "#FFFFFF", default: true },
    { name: "light-dirty", value: "#F7F7F4" },
    { name: "dark", value: "#1B1C1D" }
  ],
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
      legal: legalData,
      service: serviceData
    }
  },
  mocks: {
    url: "http://localhost:3100",
    behavior: "base",
    delay: 0,
    errorMessage: `Start the mocks server running "npm run mocks"`
  }
});

addDecorator(withInfo);
addDecorator(centered);
addDecorator(withMocksServer);

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

const loadStories = () => {
  const req = require.context("../src", true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
