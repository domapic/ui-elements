import React from "react";

import PropTypes from "prop-types";

import { Menu, Button } from "semantic-ui-react";

import withLink from "components/with-link";

import "./acceptCookies.scss";

export class AcceptCookiesComponent extends React.Component {
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
    const Link = this.props.Link;
    return (
      <Menu inverted borderless fixed="bottom" className="accept-cookies">
        <Menu.Item position="left">
          <p>
            We use cookies to help optimize the website and give you the best experience. By
            continuing in this site you accept the use of cookies. Read our updated
            <Link to={this.props.routes.privacy}>Privacy Policy.</Link>
          </p>
        </Menu.Item>
        <Menu.Item position="right">
          <Button size="mini" compact onClick={this.handleAccept}>
            Got it
          </Button>
        </Menu.Item>
      </Menu>
    );
  }
}

AcceptCookiesComponent.propTypes = {
  Link: PropTypes.func.isRequired,
  accepted: PropTypes.bool,
  onAccept: PropTypes.func.isRequired,
  routes: PropTypes.any.isRequired
};

export const AcceptCookies = withLink(AcceptCookiesComponent);
