import React from "react";
import { storiesOf } from "@storybook/react";

import withRoutes from "./index";
import readme from "./readme.md";

storiesOf("Components/with-routes", module).add(
  "simple",
  () => {
    const ShowRouteToHome = withRoutes(({ routes }) => {
      return <div>Route to home: {routes.home}</div>;
    });
    return <ShowRouteToHome />;
  },
  {
    notes: {
      markdown: readme
    }
  }
);
