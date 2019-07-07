import React from "react";
import { storiesOf } from "@storybook/react";

import BetaLabel from "./index";

import readme from "./readme.md";

storiesOf("Components/beta-label", module).add("simple", () => <BetaLabel />, {
  notes: {
    markdown: readme
  }
});
