import React from "react";
import { storiesOf } from "@storybook/react";
import { Breadcrumbs } from "./Breadcrumbs";

import { object } from "@storybook/addon-knobs";

import readme from "./readme.md";

storiesOf("Components/breadcrumbs", module).add(
  "simple",
  () => (
    <Breadcrumbs
      sections={object("sections", [
        { icon: "tachometer alternate", text: "Section", url: "foo" },
        { icon: "cube", text: "Subsection", url: "foo" },
        { icon: "bolt", text: "Current" }
      ])}
    />
  ),
  {
    notes: {
      markdown: readme
    }
  }
);
