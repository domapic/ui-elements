import { storiesOf } from "@storybook/react";
import { display } from "storybook/addons/mercury";

import * as data from "./index";
import readme from "./readme.md";

const stories = storiesOf("Data/controllers", module);

stories.add(
  "simple",
  display(data, {
    dispatchRead: true
  }),
  {
    notes: {
      markdown: readme
    }
  }
);
