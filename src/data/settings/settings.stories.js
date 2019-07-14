import { storiesOf } from "@storybook/react";
import { display } from "storybook/addons/mercury";

import * as settings from "./index";
import readme from "./readme.md";

const stories = storiesOf("Data/settings", module);

stories.add(
  "simple",
  display(settings, {
    dispatchRead: true
  }),
  {
    info: {
      disable: true
    },
    notes: {
      markdown: readme
    }
  }
);
