import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withMercury, boolean, number, text, object } from "../../../.storybook/mercury";

import withRoutesKnob from "storybook/with-routes-knob";

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
        {
          name: "rejectCookies",
          action: rejectCookies
        },
        {
          name: "acceptCookies",
          action: acceptCookies
        },
        {
          name: "toggleCookies",
          action: toggleCookies,
          value: boolean(true)
        },
        {
          name: "numberTest",
          action: toggleCookies,
          value: number(5)
        },
        {
          name: "textTest",
          action: toggleCookies,
          value: text("foo")
        },
        {
          name: "objectTest",
          action: toggleCookies,
          value: object({
            foo: "foo4"
          })
        }
      ]
    }
  }
);
