## Cookies advice module

> Displays cookies advice message.

### Details

* Displays a cookies advice message at the bottom if the page until user accepts conditions.
* When `cookies.query("accepted")` selector returns true it is not displayed.

### Usage

```jsx
import CookiesAdvice from "@domapic/ui-elements/modules/cookies-advice"

export const Foo = () => (
  <CookiesAdvice/>
);
```
