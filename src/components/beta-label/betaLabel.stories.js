import React from "react";
import { storiesOf } from "@storybook/react";
import { BetaLabel } from "./BetaLabel";

import readme from "./readme.md";

storiesOf("Components/beta-label", module).add("simple", () => <BetaLabel />, {
  notes: {
    markdown: readme
  }
});
