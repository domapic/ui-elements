import { storiesOf } from "@storybook/react";
import { display } from "storybook/addons/mercury";

import * as service from "data/service";
// import readme from "./readme.md";

const stories = storiesOf("Data/service", module);

stories.add(
  "simple",
  display(service, {
    dispatchRead: true
  }),
  {
    info: {
      disable: true
    }
  }
);
