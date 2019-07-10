import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Header, Placeholder, Menu, Icon, Visibility } from "semantic-ui-react";

import ErrorComponent from "components/error";
import Search from "components/search";
import Responsive from "components/responsive";

import "./containerContent.scss";

const HEADER = "ContentHeader";
const PLACEHOLDER = "ContentPlaceholder";
const CONTENT = "ContentContent";
const SEARCH = "ContentSearch";
const MENU = "ContentMenu";

export const ContentHeader = ({ children, as, loading }) => {
  const type = as || "h4";
  return loading ? (
    <Placeholder as={type}>
      <Placeholder.Paragraph>
        <Placeholder.Line as={type} />
      </Placeholder.Paragraph>
    </Placeholder>
  ) : (
    <Header as={type} className="content-container__header">
      {children}
    </Header>
  );
};

ContentHeader.displayName = HEADER;

ContentHeader.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool
};

export const ContentPlaceholder = ({ children }) => <Placeholder>{children}</Placeholder>;

ContentPlaceholder.propTypes = {
  children: PropTypes.node
};

ContentPlaceholder.displayName = PLACEHOLDER;

export const ContentContent = ({ children }) => <React.Fragment>{children}</React.Fragment>;

ContentContent.displayName = CONTENT;

ContentContent.propTypes = {
  children: PropTypes.node
};

export const ContentSearch = props => <Search {...props} />;

ContentSearch.displayName = SEARCH;

export const ContentMenu = ({ children }) => <React.Fragment>{children}</React.Fragment>;

ContentMenu.displayName = MENU;

ContentMenu.propTypes = {
  children: PropTypes.node
};

export class ContainerContent extends Component {
  static Header = ContentHeader;
  static Placeholder = ContentPlaceholder;
  static Content = ContentContent;
  static Search = ContentSearch;
  static Menu = ContentMenu;

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
    const search = this.renderChilds(SEARCH);
    const hasSearch = search.length;
    const menu = this.renderChilds(MENU);
    const hasMenu = menu.length;
    const placeholder = this.renderChilds(PLACEHOLDER);
    const hasPlaceholder = placeholder.length;

    return (
      <React.Fragment>
        {this.renderChilds(HEADER)}
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
                className="content-container__menu--top"
              >
                {search}
                {hasMenu ? <Menu.Menu position="right">{menu}</Menu.Menu> : null}
              </Menu>
              {this.state.fixedMenu ? (
                <Menu className="content-container__menu--top">
                  <Menu.Item />
                </Menu>
              ) : null}
            </Visibility>
          ) : null}
        </Responsive>
        <Segment
          basic={!this.props.background}
          loading={this.props.loading && !hasPlaceholder}
          className="content-container__segment"
        >
          {this.props.loading ? placeholder : null}
          {((hasPlaceholder && !this.props.loading) || !hasPlaceholder) && !this.props.error
            ? this.renderChilds(CONTENT)
            : null}
          {this.props.error ? <ErrorComponent>{this.props.error.message}</ErrorComponent> : null}
        </Segment>
        {hasSearch || hasMenu ? (
          <Responsive device="mobile">
            {hasSearch && this.state.searchVisible ? (
              <Menu inverted fixed="bottom" className="content-container__menu--bottom--search">
                {search}
              </Menu>
            ) : null}
            <Menu inverted fixed="bottom">
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

ContainerContent.propTypes = {
  background: PropTypes.bool,
  children: PropTypes.node,
  error: PropTypes.instanceOf(Error),
  loading: PropTypes.bool
};
