## Breadcrumbs component

> Displays breadcrumbs with links and icons.

### Usage

```jsx
import Breadcrumbs from "@domapic/ui-elements/components/breadcrumbs"

export const Foo = () => (
  <Breadcrumbs
      sections={[
        { icon: "tachometer alternate", text: "Section", url: "foo" },
        { icon: "cube", text: "Subsection", url: "foo" },
        { icon: "bolt", text: "Current" }
      ]}
    />
);
```

### Props

* sections - `<Array of Objects>`
	* icon - `<String>` Icon to be displayed. Must be one of ["react semantic ui" valid icons](https://react.semantic-ui.com/elements/icon/).
	* text - `<String>` Section name.
	* url - `<String>` Link url. (Last item in the breadcrumb will not render a link. It is reserved for current section).
