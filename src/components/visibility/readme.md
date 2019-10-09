## Visibility component

> Wrapper of Semantic UI Visibility behavior.

### Details

* Read the [Semantic UI Visibility behavior documentation](https://react.semantic-ui.com/behaviors/visibility).

### Usage

```jsx
import Visibility from "@domapic/ui-elements/components/visibility";

export const Foo = () => (
  <Visibility onTopPassed={() => { console.log("Top passed!"); }}>
    The callback will be executed when top passed
  </Visibility >
);
```

### Simulate visibility events using the "visibility" context

For testing purposes, visibility events can be triggered using the `contexts/visibility` element. Read more in the `contexts/visibility` documentation.

```jsx
import VisibilityContext from "@domapic/ui-elements/contexts/visibility";
import Visibility from "@domapic/ui-elements/components/visibility";

export const Foo = () => (
  <VisibilityContext.Provider value="onTopPassed">
    <Visibility onTopPassed={() => { console.log("Top passed!"); }}>
      The callback will be executed automatically when component is rendered.
    </Visibility >
  </VisibilityContext.Provider>
);
```
