import React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text, object } from "@storybook/addon-knobs";

import { DisplayHelper } from "storybook/displays/display-helper";

import { getAuthConfig } from "./auth";
import { byIdQuery, byKeyQuery } from "./queries";
import readme from "./readme.md";

const stories = storiesOf("Helpers/api", module);

stories.addDecorator(withKnobs);

stories
  .add(
    "getAuthConfig",
    () => {
      return (
        <DisplayHelper
          helper={getAuthConfig}
          args={[
            object("default value", { foo: "foo" }),
            object("options", { option1: "option1" })
          ]}
        />
      );
    },
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "byIdQuery",
    () => {
      return <DisplayHelper helper={byIdQuery} args={[text("id", "foo-id")]} />;
    },
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "byKeyQuery",
    () => {
      return <DisplayHelper helper={byKeyQuery} args={[text("key", "foo-key")]} />;
    },
    {
      notes: {
        markdown: readme
      }
    }
  );
