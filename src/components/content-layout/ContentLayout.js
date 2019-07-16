import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Menu, Icon, Visibility } from "semantic-ui-react";

import ErrorComponent from "components/error";
import Responsive from "components/responsive";

import "components/global-styles";
import styles from "./contentLayout.scss";

import { HeaderArea } from "./areas/Header";
import { PlaceholderArea } from "./areas/Placeholder";
import { ContentArea } from "./areas/Content";
import { SearchArea } from "./areas/Search";
import { MenuArea } from "./areas/Menu";

export class ContentLayout extends Component {
  static Header = HeaderArea;
  static Placeholder = PlaceholderArea;
  static Content = ContentArea;
  static Search = SearchArea;
  static Menu = MenuArea;

  constructor() {
    super();
    this.state = {
      searchVisible: false
    };
    this.handleSearchToggle = this.handleSearchToggle.bind(this);
    this.showFixedMenu = this.showFixedMenu.bind(this);
    this.hideFixedMenu = this.hideFixedMenu.bind(this);
  }

  handleSearchToggle() {
    this.setState(state => ({
      ...state,
      searchVisible: !state.searchVisible
    }));
  }

  showFixedMenu() {
    this.setState(state => ({
      ...state,
      fixedMenu: true
    }));
  }

  hideFixedMenu() {
    this.setState(state => ({
      ...state,
      fixedMenu: false
    }));
  }

  renderChilds(type) {
    return React.Children.map(this.props.children, child => {
      if (child && child.type && child.type.displayName === type) {
        return child;
      }
    });
  }

  render() {
    const search = this.renderChilds(SearchArea.displayName);
    const hasSearch = search.length;
    const menu = this.renderChilds(MenuArea.displayName);
    const hasMenu = menu.length;
    const placeholder = this.renderChilds(PlaceholderArea.displayName);
    const hasPlaceholder = placeholder.length;

    return (
      <React.Fragment>
        {this.renderChilds(HeaderArea.displayName)}
        <Responsive device="tablet-and-desktop">
          {hasSearch || hasMenu ? (
            <Visibility
              once={false}
              onTopPassed={this.showFixedMenu}
              onTopPassedReverse={this.hideFixedMenu}
              offset={50}
            >
              <Menu
                pointing
                fixed={this.state.fixedMenu ? "top" : null}
                className={styles["content-layout__menu--top"]}
                data-testid="content-layout-search"
              >
                {search}
                {hasMenu ? (
                  <Menu.Menu position="right" data-testid="content-layout-menu">
                    {menu}
                  </Menu.Menu>
                ) : null}
              </Menu>
              {this.state.fixedMenu ? (
                <Menu
                  className={styles["content-layout__menu--top"]}
                  data-testid="content-layout-menu"
                >
                  <Menu.Item />
                </Menu>
              ) : null}
            </Visibility>
          ) : null}
        </Responsive>
        <Segment
          basic={!this.props.background}
          loading={this.props.loading && !hasPlaceholder}
          className={styles["content-layout__segment"]}
          data-testid="content-layout-content"
        >
          {this.props.loading ? placeholder : null}
          {((hasPlaceholder && !this.props.loading) || !hasPlaceholder) && !this.props.error
            ? this.renderChilds(ContentArea.displayName)
            : null}
          {this.props.error ? <ErrorComponent>{this.props.error.message}</ErrorComponent> : null}
        </Segment>
        {hasSearch || hasMenu ? (
          <Responsive device="mobile">
            {hasSearch && this.state.searchVisible ? (
              <Menu
                inverted
                fixed="bottom"
                className={styles["content-layout__menu--bottom-search"]}
                data-testid="content-layout-search"
              >
                {search}
              </Menu>
            ) : null}
            <Menu
              inverted
              fixed="bottom"
              className={styles["content-layout__menu--bottom"]}
              data-testid="content-layout-menu"
            >
              {hasMenu ? menu : null}
              {hasSearch ? (
                <Menu.Menu position="right">
                  <Menu.Item active={this.state.searchVisible} onClick={this.handleSearchToggle}>
                    <Icon name="ellipsis horizontal" size="small" />
                  </Menu.Item>
                </Menu.Menu>
              ) : null}
            </Menu>
          </Responsive>
        ) : null}
      </React.Fragment>
    );
  }
}

ContentLayout.propTypes = {
  background: PropTypes.bool,
  children: PropTypes.node,
  error: PropTypes.instanceOf(Error),
  loading: PropTypes.bool
};
