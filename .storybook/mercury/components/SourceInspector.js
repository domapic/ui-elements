import React, { Component } from "react";
import PropTypes from "prop-types";

import { styled } from "@storybook/theming";
import Inspector from "react-inspector";

import { Form } from "@storybook/components";

const SourceContainer = styled.div({
  padding: "15px",
  borderBottom: "1px solid rgba(0,0,0,.1)",
  fontSize: "14px",
  li: {
    margin: "0"
  },
  position: "relative"
});

const ButtonContainer = styled.div({
  position: "absolute",
  top: "6px",
  right: "0px"
});

export default class MercuryInspector extends Component {
  render() {
    const { source, onClickClean } = this.props;
    return (
      <SourceContainer>
        <Inspector theme="chromeLight" data={source.data} name={source.name} />
        {onClickClean ? (
          <ButtonContainer>
            <Form.Button
              type="button"
              onClick={() => {
                onClickClean(source);
              }}
            >
              Clean
            </Form.Button>
          </ButtonContainer>
        ) : null}
      </SourceContainer>
    );
  }
}

MercuryInspector.displayName = "SourceInspector";

MercuryInspector.propTypes = {
  onClickClean: PropTypes.func,
  source: PropTypes.any.isRequired
};
