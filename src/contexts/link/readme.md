## Link context

> The link context defines the specific Link component that will be used by all pieces loaded in an specific application. It is needed because different types of applications, coupled to different routers (such as Next router, React Router, Gatsby Router, etc..), will require to use always an specific related Link component.

The context has a default value of  `null`, so his value has to be defined always by applications, otherwise links will not be displayed.

#### Usage

> This context should be used only by the "Link" component of this project, which will be the unique link used directly by the rest of pieces. So, refer to the "Link component" usage section. Here goes an example of how the applications should define the underlayer "Link" component to be used:

```jsx
import createHistory from "history/createBrowserHistory";
import { Router, Link } from "react-router-dom";

import LinkContext from "@domapic/ui-elements/contexts/link";
import { MainRouter } from "./routers/Main";

const history = createHistory({
  basename: "/"
});

export const App = () => {
  <Router basename="/" history={history}>
    <LinkContext.Provider value={Link}>
      <MainRouter />
    </LinkContext.Provider>
  </Router>
}

```
