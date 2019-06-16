import React from "react";

import { Label } from "semantic-ui-react";

import Responsive from "components/responsive";

import "./betaLabel.scss";

export const BetaLabel = () => {
  return (
    <Responsive device="tablet-and-desktop">
      <Label color="purple" className="beta-label">
        BETA version
      </Label>
    </Responsive>
  );
};
