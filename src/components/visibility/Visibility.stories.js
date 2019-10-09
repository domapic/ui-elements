import React from "react";
import { storiesOf } from "@storybook/react";
import { withContextKnobs } from "storybook/displays/with-context-knobs";
import { action } from "@storybook/addon-actions";
import { select } from "@storybook/addon-knobs";
import { styled } from "@storybook/theming";

const GreatHeightDiv = styled.div({
  height: "1000px",
  backgroundColor: "#ffffff",
  padding: "20px"
});

const Container = styled.div({
  padding: "20px",
  backgroundColor: "#cccccc",
  margin: "20px"
});

import VisibilityContext from "contexts/visibility";

import Visibility from "./index";
import readme from "./readme.md";

storiesOf("Components/visibility", module)
  .add(
    "simple",
    () => {
      return (
        <Container>
          <Visibility
            once={false}
            onTopPassed={action("Top passed")}
            onTopPassedReverse={action("Top passed reverse")}
          >
            <GreatHeightDiv>
              This container is enough large to allow you to scroll and see how actions are
              triggered
            </GreatHeightDiv>
          </Visibility>
        </Container>
      );
    },
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "with context",
    () => {
      const VisibilityComponent = () => (
        <div>
          <Visibility onTopPassed={action("Top passed")}>
            The &quot;Top passed&quot; action should be triggered automatically when component is
            rendered
          </Visibility>
        </div>
      );

      const VisibilityWithContext = withContextKnobs(
        VisibilityContext,
        select("Trigger", ["onTopPassed", "onTopPassedReverse"])
      )(VisibilityComponent);
      return <VisibilityWithContext />;
    },
    {
      notes: {
        markdown: readme
      }
    }
  );
