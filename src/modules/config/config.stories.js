import React from "react";

import { storiesOf } from "@storybook/react";
import { withMercury } from "../../../.storybook/mercury";

import { config, baseConfig, customConfig } from "data/service";

import fullWidth from "storybook/full-width";

import ConfigModule from "./index";
import readme from "./readme.md";

const stories = storiesOf("Modules/config", module);

stories.addDecorator(withMercury);
stories.addDecorator(fullWidth);

stories.add(
  "simple",
  () => {
    return <ConfigModule />;
  },
  {
    notes: {
      markdown: readme
    },
    mercury: {
      sources: [config, baseConfig, customConfig]
    }
  }
);

stories.add(
  "loading",
  () => {
    return <ConfigModule />;
  },
  {
    notes: {
      markdown: readme
    },
    mercury: {
      sources: [config, baseConfig, customConfig]
    },
    mocks: {
      delay: 5000
    }
  }
);

stories.add(
  "no custom config",
  () => {
    return <ConfigModule />;
  },
  {
    notes: {
      markdown: readme
    },
    mercury: {
      sources: [config, baseConfig, customConfig]
    },
    mocks: {
      delay: 0,
      behavior: "configNoCustom"
    }
  }
);

stories.add(
  "error",
  () => {
    return <ConfigModule />;
  },
  {
    notes: {
      markdown: readme
    },
    mercury: {
      sources: [config, baseConfig, customConfig]
    },
    mocks: {
      delay: 0,
      behavior: "error"
    }
  }
);
