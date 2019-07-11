import React from "react";
import { storiesOf } from "@storybook/react";

import "./index";
import readme from "./readme.md";

storiesOf("Components/global-styles", module).add(
  "simple",
  () => {
    return (
      <div className="ui info message">
        <div>Global styles are being applied</div>
        <div>
          <a href="#">This is a link</a>
        </div>
      </div>
    );
  },
  {
    notes: {
      markdown: readme
    }
  }
);
