## Search component

> Displays a search field.

### Details

* It should be rendered inside a semantic-ui Menu element for better display.
* Renders a search field, and selectors for "order by" and "sort by".

### Props

* onSearchChange - `<Function>` Triggered when search field value changes.
* onSortByChange - `<Function>` Triggered when "sort by" value changes.
* onSortOrderChange - `<Function>` Triggered when "sort order" field value changes.
* searchValue - `<String>` Value of the search field.
* sortBy - `<Array>` Array of possible values for "sort by" selector.
* sortByActive - `<String>` Selected value in "sort by" selector.
* sortOrderActive - `<String> One of "asc", "desc"` - Selected value in "sort order" selector.

### Usage

```jsx
import { Menu } from "semantic-ui-react";
import Search from "@domapic/ui-elements/components/search";

export const Foo = () => (
  <Menu>
    <Search
      searchValue={text("searchValue", "1984")}
      sortBy={object("sortBy", ["title", "author"])}
      sortByActive={select("sortByActive", { title: "title", author: "author" }, "title")}
      sortOrderActive={select("sortOrderActive", { asc: "asc", desc: "desc" }, "asc")}
      onSearchChange={action("Search field changed")}
      onSortOrderChange={action("Sort order changed")}
      onSortByChange={action("Sort by field changed")}
    />
  </Menu>
);
```
