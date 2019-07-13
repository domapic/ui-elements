import React from "react";

import { storiesOf } from "@storybook/react";
import { text, boolean, object } from "@storybook/addon-knobs";

import { DisplayHelper } from "storybook/displays/display-helper";

import { formatDate, displayValue } from "./index";
import readme from "./readme.md";

storiesOf("Helpers/formatters/formatDate", module).add(
  "simple",
  () => {
    return <DisplayHelper helper={formatDate} args={[text("dateString", "May 15 1979")]} />;
  },
  {
    info: {
      disable: true
    },
    notes: {
      markdown: readme
    }
  }
);

storiesOf("Helpers/formatters/displayValue", module)
  .add(
    "text",
    () => {
      return <DisplayHelper helper={displayValue} args={[text("value", "Foo text")]} />;
    },
    {
      info: {
        disable: true
      },
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "boolean",
    () => {
      return <DisplayHelper helper={displayValue} args={[boolean("value", true)]} />;
    },
    {
      info: {
        disable: true
      },
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "object",
    () => {
      return (
        <DisplayHelper
          helper={displayValue}
          args={[
            object("value", {
              foo: "foo"
            })
          ]}
        />
      );
    },
    {
      info: {
        disable: true
      },
      notes: {
        markdown: readme
      }
    }
  );
