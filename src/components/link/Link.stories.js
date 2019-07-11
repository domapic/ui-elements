/* eslint-disable @nex/modular-react/no-invalid-dependency-with-react */

import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";

import Link from "./index";
import readme from "./readme.md";

storiesOf("Components/link", module).add(
  "self",
  () => {
    return (
      <Link to={text("to", "https://es.lipsum.com/")}>
        {text("children", "Lorem ipsum dolor sit amet")}
      </Link>
    );
  },
  {
    notes: {
      markdown: readme
    }
  }
);
