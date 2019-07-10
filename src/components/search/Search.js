import React, { Component } from "react";
import { debounce } from "lodash";
import PropTypes from "prop-types";

import { Menu, Dropdown, Input, Icon } from "semantic-ui-react";

import "./search.scss";

const sortOrders = [{ value: "asc", icon: "caret up" }, { value: "desc", icon: "caret down" }];

export class Search extends Component {
  constructor() {
    super();
    this.handleSearchChange = debounce(this.handleSearchChange.bind(this), 200);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
  }

  handleSearchChange(event, data) {
    this.props.onSearchChange(data.value);
  }

  handleSortByChange(event, data) {
    this.props.onSortByChange(data.value);
  }

  handleSortOrderChange(event, data) {
    this.props.onSortOrderChange(data.value);
  }

  render() {
    return (
      <React.Fragment>
        <Menu.Item>
          <Input
            icon="search"
            placeholder="Search..."
            onChange={this.handleSearchChange}
            defaultValue={this.props.searchValue}
          />
        </Menu.Item>
        <Menu.Menu>
          <Dropdown item text="Sort" className="search__dropdown" pointing="top right" icon="sort">
            <Dropdown.Menu size="mini">
              <Dropdown.Header>By</Dropdown.Header>
              {this.props.sortBy.map(sortBy => (
                <Dropdown.Item
                  active={this.props.sortByActive === sortBy}
                  onClick={this.handleSortByChange}
                  value={sortBy}
                  key={sortBy}
                >
                  {sortBy}
                </Dropdown.Item>
              ))}
              <Dropdown.Divider />
              {sortOrders.map(sortOrder => (
                <Dropdown.Item
                  active={this.props.sortOrderActive === sortOrder.value}
                  onClick={this.handleSortOrderChange}
                  value={sortOrder.value}
                  key={sortOrder.value}
                >
                  <Icon name={sortOrder.icon} size="small" /> {sortOrder.value}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </React.Fragment>
    );
  }
}

Search.propTypes = {
  onSearchChange: PropTypes.func,
  onSortByChange: PropTypes.func,
  onSortOrderChange: PropTypes.func,
  searchValue: PropTypes.string,
  sortBy: PropTypes.array,
  sortByActive: PropTypes.string,
  sortOrderActive: PropTypes.string
};

Search.defaultProps = {
  onSearchChange: () => {},
  onSortByChange: () => {},
  onSortOrderChange: () => {},
  searchValue: "",
  sortBy: [],
  sortByActive: "",
  sortOrderActive: "asc"
};
