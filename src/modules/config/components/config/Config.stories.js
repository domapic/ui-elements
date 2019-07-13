import React from "react";
import { storiesOf } from "@storybook/react";
import { text, object, boolean } from "@storybook/addon-knobs";
import fullWidth from "storybook/decorators/full-width";

import Config from "./index";
import readme from "./readme.md";

const stories = storiesOf("Modules/config/Components/config", module);

stories
  .addDecorator(fullWidth)
  .add(
    "simple",
    () => (
      <Config
        error={null}
        loading={boolean("loading", false)}
        title={text("title", "Title")}
        config={object("config", [
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
    ),
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "error",
    () => (
      <Config
        error={new Error(text("error message", "Error loading config"))}
        loading={false}
        title={text("title", "Title")}
        config={[]}
      />
    ),
    {
      notes: {
        markdown: readme
      }
    }
  );
