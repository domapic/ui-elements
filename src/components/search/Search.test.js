import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";

import { Search } from "./Search";

describe("Search component", () => {
  it("should render search field with provided value", () => {
    const { container } = render(<Search searchValue="foo" />);
    expect(container.querySelector("input")).toHaveValue("foo");
  });

  it("should render provided sortBy fields when Sort dropdown is clicked", () => {
    const { getByTestId, getByText } = render(
      <Search searchValue="foo" sortBy={["foo-sort-1", "foo-sort-2"]} />
    );
    fireEvent.click(getByTestId("search-sort-by-order"));
    expect(getByText("foo-sort-2")).toBeDefined();
  });

  it("should execute onSortByChange callback when sortBy button is clicked", () => {
    const onSortByChange = jest.fn();
    const { getByTestId, getByText } = render(
      <Search
        searchValue="foo"
        sortBy={["foo-sort-1", "foo-sort-2"]}
        onSortByChange={onSortByChange}
      />
    );
    fireEvent.click(getByTestId("search-sort-by-order"));
    fireEvent.click(getByText("foo-sort-2"));
    expect(onSortByChange.mock.calls[0][0]).toEqual("foo-sort-2");
  });

  it("should execute onSortOrderChange callback when sortOrder button is clicked", () => {
    const onSortOrderChange = jest.fn();
    const { getByTestId, getByText } = render(
      <Search searchValue="foo" onSortOrderChange={onSortOrderChange} />
    );
    fireEvent.click(getByTestId("search-sort-by-order"));
    fireEvent.click(getByText("asc"));
    expect(onSortOrderChange.mock.calls[0][0]).toEqual("asc");
  });

  it("should not throw when sortOrder button is clicked if no callback is provided", () => {
    const { getByTestId, getByText } = render(<Search searchValue="foo" />);
    fireEvent.click(getByTestId("search-sort-by-order"));
    fireEvent.click(getByText("asc"));
  });

  it("should execute onSearchChange callback when search input changes", async () => {
    const onSearchChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Search searchValue="foo" onSearchChange={onSearchChange} />
    );
    const input = getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "new-foo" } });
    await wait(
      () => {
        expect(onSearchChange.mock.calls[0][0]).toEqual("new-foo");
      },
      {
        timeout: 500
      }
    );
  });
});
