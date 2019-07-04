import { storiesOf } from "@storybook/react";
import { withMercury, display } from "storybook/addons/mercury";

import * as service from "data/service";
// import readme from "./readme.md";

const stories = storiesOf("Data/service", module);

stories.addDecorator(withMercury);

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
