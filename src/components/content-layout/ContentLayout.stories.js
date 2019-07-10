import React from "react";
import { storiesOf } from "@storybook/react";
import fullWidth from "storybook/decorators/full-width";
import { boolean } from "@storybook/addon-knobs";

import { Placeholder } from "semantic-ui-react";

import Layout from "./index";

import readme from "./readme.md";

storiesOf("Components/content-layout", module)
  .addDecorator(fullWidth)
  .add(
    "simple",
    () => (
      <Layout
        loading={boolean("loading", false)}
        error={null}
        background={boolean("background", true)}
      >
        <Layout.Header loading={boolean("header loading", false)}>
          This is the header area
        </Layout.Header>
        <Layout.Menu>This is the menu area</Layout.Menu>
        <Layout.Content>
          This is displayed in the content area when loading prop is false
        </Layout.Content>
      </Layout>
    ),
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "with placeholder",
    () => (
      <Layout
        loading={boolean("loading", true)}
        error={null}
        background={boolean("background", true)}
      >
        <Layout.Header loading={boolean("header loading", true)}>
          This is the header area
        </Layout.Header>
        <Layout.Menu>This is the menu area</Layout.Menu>
        <Layout.Placeholder>
          <Placeholder.Line />
        </Layout.Placeholder>
        <Layout.Content>
          This is displayed in the content area when loading prop is false
        </Layout.Content>
      </Layout>
    ),
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "with search",
    () => (
      <Layout
        loading={boolean("loading", false)}
        error={null}
        background={boolean("background", true)}
      >
        <Layout.Header loading={boolean("header loading", false)}>
          This is the header area
        </Layout.Header>
        <Layout.Menu>This is the menu area</Layout.Menu>
        <Layout.Search />
        <Layout.Content>
          This is displayed in the content area when loading prop is false
        </Layout.Content>
      </Layout>
    ),
    {
      notes: {
        markdown: readme
      }
    }
  );
