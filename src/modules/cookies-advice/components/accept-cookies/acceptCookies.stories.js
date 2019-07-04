import React from "react";
import { storiesOf } from "@storybook/react";
import { text, object, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import AcceptCookies from "./index";
import readme from "./readme.md";

const stories = storiesOf("Modules/cookies-advice/Components/accept-cookies", module);

stories.add(
  "simple",
  () => (
    <AcceptCookies
      routes={object("routes", { privacy: "#" })}
      onAccept={action(text("onAccept", "action:accepted"))}
      accepted={boolean("accepted", false)}
    />
  ),
  {
    notes: {
      markdown: readme
    }
  }
);
