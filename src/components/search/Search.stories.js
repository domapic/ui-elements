import React from "react";
import { storiesOf } from "@storybook/react";
import { text, object, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Menu } from "semantic-ui-react";

import Search from "./index";
import readme from "./readme.md";

storiesOf("Components/search", module).add(
  "simple",
  () => {
    return (
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
  },
  {
    notes: {
      markdown: readme
    }
  }
);
