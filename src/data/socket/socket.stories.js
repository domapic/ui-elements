import { storiesOf } from "@storybook/react";
import { display } from "storybook/addons/mercury";

import * as socket from "./index";
import readme from "./readme.md";

const stories = storiesOf("Data/socket", module);

stories.add("simple", display(socket), {
  info: {
    disable: true
  },
  notes: {
    markdown: readme
  }
});
