import React, { Component } from "react";
import PropTypes from "prop-types";
import { styled } from "@storybook/theming";

import Inspector from "react-inspector";

const DisplayWrapper = styled.div({
  paddingLeft: "20px",
  paddingRight: "20px",
  marginTop: "-3rem"
});

const FixtureContainer = styled.div({
  padding: "15px",
  borderBottom: "1px solid rgba(0,0,0,.1)",
  fontSize: "14px",
  li: {
    margin: "0"
  }
});

class DisplayFixture extends Component {
  render() {
    const { fixture } = this.props;
    return (
      <FixtureContainer>
        <Inspector theme="chromeLight" data={fixture.data} name={fixture.name} />
      </FixtureContainer>
    );
  }
}

DisplayFixture.displayName = "DisplayFixture";

DisplayFixture.propTypes = {
  fixture: PropTypes.any
};

export default class DisplayBehavior extends Component {
  render() {
    const { fixtures } = this.props;
    return (
      <DisplayWrapper>
        {fixtures.map(fixture => {
          return <DisplayFixture key={fixture.name} fixture={fixture} />;
        })}
      </DisplayWrapper>
    );
  }
}

DisplayBehavior.displayName = "DisplayBehavior";

DisplayBehavior.propTypes = {
  fixtures: PropTypes.array
};
