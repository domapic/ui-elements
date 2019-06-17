## Cookies advice module

> Displays cookies advice message.

### Details

* Displays a cookies advice message at the bottom of the page until user accepts conditions.

### Context dependencies

* `contexts/routes`
  * `routes.privacy` Link to the privacy policy page.
* `contexts/link`
  * `link` Link component to be used for internal links. (such as `{ Link } from "react-router-dom"`)

### Usage

```jsx
import CookiesAdvice from "@domapic/ui-elements/modules/cookies-advice"

export const Foo = () => (
  <CookiesAdvice/>
);
```

### Data

* `data/legal`
  * When `cookies.query("accepted")` selector returns true it is not displayed.
  * Dispatchs `acceptCookies` action when "got it" button is pressed.
