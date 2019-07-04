import { storiesOf } from "@storybook/react";
import { display } from "storybook/addons/mercury";

import * as data from "data/legal";
// import readme from "./readme.md";

const stories = storiesOf("Data/legal", module);

stories.add(
  "simple",
  display(data, {
    dispatchRead: true
  }),
  {
    info: {
      disable: true
    },
    mercury: {
      actions: [
        data.rejectCookies,
        data.acceptCookies,
        {
          name: "updateRoot",
          action: () => data.cookies.update({ accepted: false })
        }
      ]
    }
  }
);
