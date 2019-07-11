import React from "react";
import { storiesOf } from "@storybook/react";
import { object } from "@storybook/addon-knobs";
import fullWidth from "storybook/decorators/full-width";

import ItemInfo from "./index";
import readme from "./readme.md";

storiesOf("Components/item-info", module)
  .addDecorator(fullWidth)
  .add(
    "self",
    () => {
      return (
        <ItemInfo
          data={object("data", [
            {
              label: "label",
              value: "value"
            },
            {
              label: "label 2",
              value: "value 2"
            }
          ])}
        />
      );
    },
    {
      notes: {
        markdown: readme
      }
    }
  );
