import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Menu, Button } from "semantic-ui-react";

import RoutesContext from "contexts/routes";
import BetaLabel from "components/beta-label";

import "./acceptCookies.scss";

export class AcceptCookies extends React.Component {
  constructor(props) {
    super(props);
    this.handleAccept = this.handleAccept.bind(this);
  }

  handleAccept() {
    this.props.onAccept();
  }

  render() {
    if (this.props.accepted) {
      return null;
    }
    return (
      <Menu inverted borderless fixed="bottom" className="accept-cookies">
        <Menu.Item position="left">
          <p>
            We use cookies to help optimize the website and give you the best experience. By
            continuing in this site you accept the use of cookies. Read our updated
            <Link to={this.context.privacy}>Privacy Policy.</Link>
          </p>
        </Menu.Item>
        <Menu.Item position="right">
          <Button size="mini" compact onClick={this.handleAccept}>
            Got it
          </Button>
        </Menu.Item>
        <BetaLabel />
      </Menu>
    );
  }
}

AcceptCookies.contextType = RoutesContext;

AcceptCookies.propTypes = {
  accepted: PropTypes.bool,
  onAccept: PropTypes.func.isRequired
};
