import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";

import { ErrorComponent } from "./Error";
import readme from "./readme.md";

const stories = storiesOf("Components/error", module);

stories.add("simple", () => <ErrorComponent>{text("Text", "Error message")}</ErrorComponent>, {
  notes: {
    markdown: readme
  }
});
