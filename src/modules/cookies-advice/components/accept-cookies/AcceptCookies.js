import React from "react";

import PropTypes from "prop-types";

import { Menu, Button } from "semantic-ui-react";

import Link from "components/link";

import styles from "./acceptCookies.scss";

export default class AcceptCookies extends React.Component {
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
      <Menu inverted borderless fixed="bottom" className={styles["acceptCookies"]}>
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

AcceptCookies.propTypes = {
  accepted: PropTypes.bool,
  onAccept: PropTypes.func.isRequired,
  routes: PropTypes.shape({
    privacy: PropTypes.string.isRequired
  }).isRequired
};
