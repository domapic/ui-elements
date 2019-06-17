import React from "react";
import { storiesOf } from "@storybook/react";

import Module from "./index";
import readme from "./readme.md";

const stories = storiesOf("Modules/cookies-advice", module);

stories.add("default", () => <Module />, {
  notes: {
    markdown: readme
  }
});
