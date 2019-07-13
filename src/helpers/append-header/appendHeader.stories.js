import React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import { DisplayHelper } from "storybook/displays/display-helper";

import { appendStyleSheet } from "./appendStyleSheet";
import readme from "./readme.md";

const stories = storiesOf("Helpers/append-header", module);

stories.addDecorator(withKnobs);

stories.add(
  "appendHeader",
  () => {
    return (
      <DisplayHelper helper={appendStyleSheet} args={[text("url", "semantic/semantic.min.css")]} />
    );
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
