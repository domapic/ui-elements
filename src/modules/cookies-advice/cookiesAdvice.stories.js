import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withMercury } from "../../../.storybook/mercury";

import withRoutesKnob from "storybook/with-routes-knob";

import { cookies, rejectCookies, acceptCookies } from "data/legal";
import CookiesAdviceModule from "./index";
import readme from "./readme.md";

const stories = storiesOf("Modules/cookies-advice", module);

stories.addDecorator(withKnobs);
stories.addDecorator(withMercury);

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
    },
    mercury: {
      sources: [cookies],
      actions: [
        {
          name: "rejectCookies",
          action: rejectCookies
        },
        {
          name: "acceptCookies",
          action: acceptCookies
        }
      ]
    }
  }
);
