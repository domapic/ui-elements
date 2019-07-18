## api helpers

> Helpers to build api queries and apis configuration.

### getAuthConfig

Returns configuration for a mercury-api origin adding authentication tag.

#### API

`getAuthConfig(defaultValue[, options])`

* Arguments
	* defaultValue - `<Any>` Default value for mercury-api origin.
	* options - `<Object>` Options for mercury-api origin.
* Returns
	* `<Object>` Object containing mercury api options including default value and authentication tags.

#### Usage

```jsx
import { Api } from "@xbyorange/mercury-api";

import { getAuthConfig } from "helpers/api";

export const fooOrigin = new Api("/foo", getAuthConfig({}, {
  retries: 5
}));
```

### byIdQuery

Returns a mercury api query adding url paremeter for id field.

#### API

`byIdQuery(id)`

* Arguments
	* id - `<String>` Id.
* Returns
	* `<Object>` Mercury api query with id as url parameter.

#### Usage

```jsx
import { byIdQuery } from "helpers/api";

fooOrigin.addCustomQuery({
	byId: byIdQuery
});
```

### byKeyQuery

Returns a mercury api query adding url paremeter for key field.

#### API

`byKeyQuery(key)`

* Arguments
	* key - `<String>` Key.
* Returns
	* `<Object>` Mercury api query with key as url parameter.

#### Usage

```jsx
import { byKeyQuery } from "helpers/api";

fooOrigin.addCustomQuery({
	byKey: byKeyQuery
});
```
