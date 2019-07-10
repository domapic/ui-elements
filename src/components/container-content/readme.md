## Container Content component

> Container for the main content

This Container expose some subcomponents as statics that correspond to defined areas inside the container.

### Usage

```jsx
import Container from "@domapic/ui-elements/components/container-content"

export const Foo = () => (
  <Container loading={false} error={null} background={true}>
    <Container.Header loading={true}>
      This will be displayed in the header area
    </Container.Header>
    <Container.Menu>
      This will be displayed in the menu area
    </Container.Menu>
    <Container.Placeholder>
      This will be displayed in the content area while loading prop is true
    </Container.Placeholder>
    <Container.Content>
      This will be displayed in the content area when loading prop is false
    </Container.Content>
  </Container>
);
```

### Props

* loading - `<Boolean>` - If true, placeholder area will be rendered instead of content area.
* error - `<Error>` - If defined, the message of the error will be displayed instead of content area.
* background - `<Boolean>` - If true, the content area will be displayed with background and border, if not, it will be transparent.

### Areas

#### Header

##### Props

* loading - `<Boolean>` - If true, a placeholder will be rendered instead of children.
* as - `<String>` - Identifier of the html tag to render as header ([read the react-semantic-ui Header element documentation for further info](https://react.semantic-ui.com/elements/header/)). `h4` by default.
* children - `<React node>` Children to render inside the header.

#### Menu

When the container position is scrolled above the window area, the menu display type becomes:
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




