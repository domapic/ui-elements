import React from "react";
import { storiesOf } from "@storybook/react";

import { DisplayContext } from "storybook/displays/display-context";

import Context from "./index";
import readme from "./readme.md";

const stories = storiesOf("Contexts/responsive", module);

stories.add(
  "default",
  () => {
    return <DisplayContext Context={Context} name="Responsive" />;
  },
  {
    notes: {
      markdown: readme
    }
  }
);
