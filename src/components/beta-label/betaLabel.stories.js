import React from "react";
import { storiesOf } from "@storybook/react";
import { BetaLabel } from "./BetaLabel";

import readme from "./readme.md";

storiesOf("Components/BetaLabel", module).add("default", () => <BetaLabel />, {
  notes: {
    markdown: readme
  }
});
