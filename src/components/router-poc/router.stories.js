import React from "react";
import { storiesOf } from "@storybook/react";
import StoryRouter from "storybook-react-router";

import Router from "./index";

storiesOf("POCs/router/base", module)
  .addDecorator(
    StoryRouter(
      {},
      {
        initialEntries: ["/"]
      }
    )
  )
  .add("simple", () => (
    <Router
      match={{
        path: "/"
      }}
    />
  ));

storiesOf("POCs/router/subroute", module)
  .addDecorator(
    StoryRouter(
      {},
      {
        initialEntries: ["/subroute"]
      }
    )
  )
  .add("simple", () => (
    <Router
      match={{
        path: "/"
      }}
    />
  ));

storiesOf("POCs/router/subsubroute", module)
  .addDecorator(
    StoryRouter(
      {},
      {
        initialEntries: ["/subroute/subroute"]
      }
    )
  )
  .add("simple", () => (
    <Router
      match={{
        path: "/"
      }}
    />
  ));
