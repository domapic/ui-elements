import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";

import ExternalLink from "./index";
import readme from "./readme.md";

storiesOf("Components/external-link", module).add(
  "simple",
  () => {
    return (
      <ExternalLink to="https://www.domapic.com" self={boolean("self", false)}>
        Visit the Domapic website
      </ExternalLink>
    );
  },
  {
    notes: {
      markdown: readme
    }
  }
);
