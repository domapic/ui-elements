import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";
import { withContextKnobs } from "storybook/displays/with-context-knobs";

import ResponsiveContext from "contexts/responsive";

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

storiesOf("Components/responsive", module)
  .add(
    "simple",
    () => {
      const device = select(label, options, defaultValue);
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
  )
  .add(
    "with context",
    () => {
      const device = select(label, options, defaultValue);

      const ResponsiveComponent = () => (
        <div>
          <div>
            Responsive content now should be displayed only when the context has a value of &quot;
            {device}&quot;
          </div>
          <Responsive device={device}>Here goes the responsive content</Responsive>
        </div>
      );

      const ResponsiveWithContext = withContextKnobs(ResponsiveContext, {
        force: select("responsive context", options, defaultValue)
      })(ResponsiveComponent);
      return <ResponsiveWithContext />;
    },
    {
      notes: {
        markdown: readme
      }
    }
  );
