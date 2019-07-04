import React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import { DisplayHelper } from "storybook/displays/display-helper";

import { formatDate } from "./index";
import readme from "./readme.md";

const stories = storiesOf("Helpers/formatters", module);

stories.addDecorator(withKnobs);

stories.add(
  "formatDate",
  () => {
    return <DisplayHelper helper={formatDate} args={[text("dateString", "May 15 1979")]} />;
  },
  {
    info: {
      disable: true
    },
    notes: {
      markdown: readme
    }
  }
);
