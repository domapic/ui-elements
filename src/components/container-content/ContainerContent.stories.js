import React from "react";
import { storiesOf } from "@storybook/react";
import fullWidth from "storybook/decorators/full-width";
import { boolean } from "@storybook/addon-knobs";

import { Placeholder } from "semantic-ui-react";

import { ContainerContent } from "./ContainerContent";

import readme from "./readme.md";

storiesOf("Components/container-content", module)
  .addDecorator(fullWidth)
  .add(
    "simple",
    () => (
      <ContainerContent
        loading={boolean("loading", false)}
        error={null}
        background={boolean("background", true)}
      >
        <ContainerContent.Header loading={boolean("header loading", false)}>
          This is the header area
        </ContainerContent.Header>
        <ContainerContent.Menu>This is the menu area</ContainerContent.Menu>
        <ContainerContent.Content>
          This is displayed in the content area when loading prop is false
        </ContainerContent.Content>
      </ContainerContent>
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
      <ContainerContent
        loading={boolean("loading", true)}
        error={null}
        background={boolean("background", true)}
      >
        <ContainerContent.Header loading={boolean("header loading", true)}>
          This is the header area
        </ContainerContent.Header>
        <ContainerContent.Menu>This is the menu area</ContainerContent.Menu>
        <ContainerContent.Placeholder>
          <Placeholder.Line />
        </ContainerContent.Placeholder>
        <ContainerContent.Content>
          This is displayed in the content area when loading prop is false
        </ContainerContent.Content>
      </ContainerContent>
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
      <ContainerContent
        loading={boolean("loading", false)}
        error={null}
        background={boolean("background", true)}
      >
        <ContainerContent.Header loading={boolean("header loading", false)}>
          This is the header area
        </ContainerContent.Header>
        <ContainerContent.Menu>This is the menu area</ContainerContent.Menu>
        <ContainerContent.Search />
        <ContainerContent.Content>
          This is displayed in the content area when loading prop is false
        </ContainerContent.Content>
      </ContainerContent>
    ),
    {
      notes: {
        markdown: readme
      }
    }
  );
