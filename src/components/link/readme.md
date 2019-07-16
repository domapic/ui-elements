## Link component

> Displays a link.

### Details

* It uses the Link component defined by the link context.
* If there is no defined Link component in the link context, it always will render an `<a>` element.
* If the `to` prop starts with `http`, then it will render an `external-link` component.

### Props

* to - `<String>` href attribute for the link element.
* self - `<Boolean>` If `true`, adds `target="_blank"` and `rel="noopener"` attributes.

### Usage

```jsx
import Link from "@domapic/ui-elements/components/link";

export const Foo = () => (
  <Link to="http://foo.com">
    Click here to go to foo.com
  </Link >
);
```
