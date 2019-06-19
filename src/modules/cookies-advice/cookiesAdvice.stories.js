import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

import withRoutesKnob from "storybook/with-routes-knob";

import CookiesAdviceModule from "./index";
import readme from "./readme.md";

const stories = storiesOf("Modules/cookies-advice", module);

stories.addDecorator(withKnobs);

stories.add(
  "simple",
  () => {
    const CookiesAdvice = withRoutesKnob({
      privacy: "#"
    })(CookiesAdviceModule);
    return <CookiesAdvice />;
  },
  {
    notes: {
      markdown: readme
    }
  }
);
