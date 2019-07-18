import React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import { DisplayHelper } from "storybook/displays/display-helper";

import {
  isISO8601,
  isEmail,
  isIP,
  matches,
  isURL,
  isUserName,
  isPassword,
  controllerNameHasMinLength
} from "./validators";
import readme from "./readme.md";

const stories = storiesOf("Helpers/validators", module);

stories.addDecorator(withKnobs);

const options = {
  notes: {
    markdown: readme
  }
};

stories
  .add(
    "isISO8601",
    () => {
      return <DisplayHelper helper={isISO8601} args={[text("date", "2019-07-27")]} />;
    },
    options
  )
  .add(
    "isEmail",
    () => {
      return <DisplayHelper helper={isEmail} args={[text("email", "foo@foo.com")]} />;
    },
    options
  )
  .add(
    "isIP",
    () => {
      return <DisplayHelper helper={isIP} args={[text("ip", "192.168.1.1")]} />;
    },
    options
  )
  .add(
    "matches",
    () => {
      return <DisplayHelper helper={matches} args={[text("value", "foo"), /foo/]} />;
    },
    options
  )
  .add(
    "isURL",
    () => {
      return <DisplayHelper helper={isURL} args={[text("url", "http://foo.com")]} />;
    },
    options
  )
  .add(
    "isUserName",
    () => {
      return <DisplayHelper helper={isUserName} args={[text("name", "user-name")]} />;
    },
    options
  )
  .add(
    "isPassword",
    () => {
      return <DisplayHelper helper={isPassword} args={[text("password", "foo-password")]} />;
    },
    options
  )
  .add(
    "controllerNameHasMinLength",
    () => {
      return (
        <DisplayHelper
          helper={controllerNameHasMinLength}
          args={[text("controller name", "foo-controller-name")]}
        />
      );
    },
    options
  );
