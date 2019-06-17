import React from "react";
import { storiesOf } from "@storybook/react";
import { BetaLabel } from "./BetaLabel";

import readme from "./betaLabel.md";

storiesOf("Components/BetaLabel", module).add("display", () => <BetaLabel />, {
  notes: {
    markdown: readme
  }
});
