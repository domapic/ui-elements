import { configure, addDecorator, addParameters } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import { withKnobs } from "@storybook/addon-knobs";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withConsole } from "@storybook/addon-console";
import StoryRouter from "storybook-react-router";

import { withMercury } from "storybook/addons/mercury";
import { withMocksServer } from "storybook/addons/mocks-server";
import { withMercuryApi } from "storybook/addons/mercury-api";

import * as analyticsData from "../src/data/analytics";
import * as cloudUsersData from "../src/data/cloud-users";
import * as controllersData from "../src/data/controllers";
import * as legalData from "../src/data/legal";
import * as securityData from "../src/data/security";
import * as servicesData from "../src/data/services";
import * as settingsData from "../src/data/settings";
import * as usersData from "../src/data/users";

import theme from "./theme";

addParameters({
  mercury: {
    domains: {
      legal: legalData,
      settings: settingsData,
      analytics: analyticsData,
      cloudUsers: cloudUsersData,
      controllers: controllersData,
      security: securityData,
      services: servicesData,
      users: usersData
    }
  },
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
  mocks: {
    url: "http://localhost:3100",
    behavior: "base",
    delay: 0,
    errorMessage: `Start the mocks server running "npm run mocks"`
  },
  mercuryApi: {
    baseUrl: "http://localhost:3100/api",
    clean: true
  }
});

addDecorator(StoryRouter());
addDecorator(withKnobs);
addDecorator(centered);
addDecorator(withMocksServer);
addDecorator(withMercury);
addDecorator(withMercuryApi);

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

const loadStories = () => {
  const req = require.context("../src", true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
