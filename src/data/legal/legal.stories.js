import { storiesOf } from "@storybook/react";
import { withMercury, display } from "../../../.storybook/mercury";

import * as data from "data/legal";
// import readme from "./readme.md";

const stories = storiesOf("Data/legal", module);

stories.addDecorator(withMercury);

stories.add("simple", display(data), {
  info: {
    disable: true
  },
  mercury: {
    actions: [data.rejectCookies, data.acceptCookies]
  }
});
