## withRoutes HOC

> High order component that adds the routes context to them through a `routes` prop.

### Usage

```jsx
import Link from "@domapic/ui-elements/components/link";
import withRoutes from "@domapic/ui-elements/components/with-routes";

const HomeLink = ({ routes }) => (
  <Link to={routes.home}>Home</Link>
);

export default withRoutes(HomeLink);
```
