import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import Responsive from "./index";
import readme from "./readme.md";

const label = "device";
const options = {
  mobile: "mobile",
  mobile_and_tablet: "mobile-and-tablet",
  tablet: "tablet",
  tablet_and_desktop: "tablet-and-desktop",
  desktop: "desktop"
};
const defaultValue = "desktop";
const groupId = "device-selector";

storiesOf("Components/responsive", module).add(
  "simple",
  () => {
    const device = select(label, options, defaultValue, groupId);
    return (
      <div>
        <div>Responsive content now should be displayed only in &quot;{device}&quot; width</div>
        <Responsive device={device}>Here goes the responsive content</Responsive>
      </div>
    );
  },
  {
    notes: {
      markdown: readme
    }
  }
);
