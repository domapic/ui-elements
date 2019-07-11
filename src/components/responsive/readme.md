## Responsive component

> Wrapper of SemanticResponsive component.

### Details

* Receives device as string, and depending of current window width, it renders or not the provided children.

### Props

* as - `<String>` - Identifier of the html tag to render as children wrapper ([read the react-semantic-ui Responsive element documentation for further info](https://react.semantic-ui.com/addons/responsive)). `div` by default.
* className - `<String>` - Class name to add to wrapper.
* children - `<React node>` Children to render.
* device - `<String>` Device width in which the content should be rendered. Available choices are:
	* mobile
	* mobile-and-tablet
	* tablet
	* tablet-and-desktop
	* desktop

### Statics

The component export as statics choices for the device prop:
* Responsive.MOBILE
* Responsive.MOBILE_AND_TABLET
* Responsive.TABLET
* Responsive.TABLET_AND_DESKTOP
* Responsive.DESKTOP

### Usage

```jsx
import Responsive from "@domapic/ui-elements/components/responsive";

export const Foo = () => (
  <Responsive device={Responsive.TABLET_AND_DESKTOP}>
    This content will be rendered only from tablet width
  </Responsive >
);
```

### Simulate widths using the "responsive" context

For testing purposes, the "width" of the window can be simulated using the `contexts/responsive` element.

```jsx
import ResponsiveContext from "@domapic/ui-elements/contexts/responsive";
import Responsive from "@domapic/ui-elements/components/responsive";

export const Foo = () => (
  <ResponsiveContext.Provider value={{ force: Responsive.MOBILE }}>
    <Responsive device={Responsive.MOBILE}>
      This content will be rendered always
    </Responsive >
  </ResponsiveContext.Provider>
);
```
