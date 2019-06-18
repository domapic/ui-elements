import React from "react";
import { storiesOf } from "@storybook/react";

import CookiesAdvice from "./index";
import readme from "./readme.md";

const stories = storiesOf("Modules/cookies-advice", module);

stories.add("simple", () => <CookiesAdvice />, {
  notes: {
    markdown: readme
  }
});
