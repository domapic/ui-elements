## External link component

> Displays an standard html link element.

### Details

* Displays an <a> tag with `rel` and `target` correspondant attributes depending of target.

### Props

* to - `<String>` - href attribute for the link element.
* self - `<Boolean>` If `true`, adds `target="_blank"` and `rel="noopener"` attributes.

### Usage

```jsx
import ExternalLink from "@domapic/ui-elements/components/external-link";

export const Foo = () => (
  <ExternalLink to="https://www.domapic.com">
    Click here to visit the Domapic website
  </ExternalLink >
);
```
