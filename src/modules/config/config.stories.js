import React from "react";

import { storiesOf } from "@storybook/react";
import { withMercury } from "../../../.storybook/mercury";

import { baseConfig, customConfig } from "data/service";

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
      sources: [baseConfig, customConfig]
    }
  }
);
