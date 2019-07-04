import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

import { withMercury, boolean, number, text, object } from "storybook/addons/mercury";
import withRoutesKnob from "storybook/decorators/with-routes-knob";

import {
  cookies,
  rejectCookies,
  acceptCookies,
  toggleCookies,
  cookiesAreAccepted
} from "data/legal";
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
      sources: [cookies, cookiesAreAccepted],
      actions: [
        rejectCookies,
        acceptCookies,
        {
          action: toggleCookies,
          value: boolean(true)
        },
        {
          name: "testNumber",
          action: toggleCookies,
          value: number(5)
        },
        {
          name: "testString",
          action: toggleCookies,
          value: text("foo")
        },
        {
          name: "testObject",
          action: toggleCookies,
          value: object({
            foo: "foo4"
          })
        }
      ]
    }
  }
);
