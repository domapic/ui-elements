## Content Layout component

> Layout for the main content

This Layout exposes some subcomponents as statics that correspond to defined areas inside the layout.

### Usage

```jsx
import Layout from "@domapic/ui-elements/components/content-layout"

export const Foo = () => (
  <Layout loading={false} error={null} background={true}>
    <Layout.Header loading={true}>
      This will be displayed in the header area
    </Layout.Header>
    <Layout.Menu>
      This will be displayed in the menu area
    </Layout.Menu>
    <Layout.Placeholder>
      This will be displayed in the content area while loading prop is true
    </Layout.Placeholder>
    <Layout.Content>
      This will be displayed in the content area when loading prop is false
    </Layout.Content>
  </Layout>
);
```

### Props

* loading - `<Boolean>` If true, placeholder area will be rendered instead of content area.
* error - `<Error>` If defined, the message of the error will be displayed instead of content area.
* background - `<Boolean>` If true, the content area will be displayed with background and border, if not, it will be transparent.

### Areas

#### Header

##### Props

* loading - `<Boolean>` If true, a placeholder will be rendered instead of children.
* as - `<String>` Identifier of the html tag to render as header ([read the react-semantic-ui Header element documentation for further info](https://react.semantic-ui.com/elements/header/)). `h4` by default.
* children - `<React node>` Children to render inside the header.

#### Menu

When the layout position is scrolled above the window area, the menu display type becomes:
* Fixed to the top for window widths upper than mobile media-query.
* Fixed to the bottom for window widths lower than mobile media-query.

##### Props

* children - `<React node>` Children to render inside the menu.

#### Search

A `@domapic/ui-elements/components/search` component. When defined, it will be displayed inside the menu area. In mobile width, a button is displayed automatically to toggle the visibility of the search.

#### Placeholder

Displayed in the content area when the loading property is true. If not defined, a loading spinner will be displayed instead.

##### Props

* children - `<React node>` Children to render as placeholder. It expects to receive [react-semantic-ui Placeholder elements](https://react.semantic-ui.com/elements/placeholder/) as children.

#### Content

Displayed in the content area when the loading property is false.

##### Props

* children - `<React node>` Children to render as content.




