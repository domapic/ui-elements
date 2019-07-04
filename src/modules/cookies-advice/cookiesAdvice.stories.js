import React from "react";
import { storiesOf } from "@storybook/react";

import { object } from "@storybook/addon-knobs";

import { boolean, number, text, object as mercuryObject } from "storybook/addons/mercury";
import { withContextKnobs } from "storybook/displays/with-context-knobs";
import RoutesContext from "contexts/routes";

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

stories.add(
  "simple",
  () => {
    const CookiesAdvice = withContextKnobs(
      RoutesContext,
      object("routes context", {
        privacy: "#"
      })
    )(CookiesAdviceModule);
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
          value: mercuryObject({
            foo: "foo4"
          })
        }
      ]
    }
  }
);
