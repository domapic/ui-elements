## formatters helpers

> Helpers to format data for display.

### formatDate

Given a date as string, formats it to "YY-MM-DD, HH:mm:ss".

#### API

`formatDate(dateAsString)`

* Arguments
	* dateAsString - `<String>` Date to be formatted.

* Returns
	* <String> - Formatted date.

#### Usage

```jsx
import { formatDate } from "@domapic/ui-elements/helpers/formatters"

formatDate("2019-06-04T18:30:31.605Z"); // 19-06-04, 20:30:31
```

### displayValue

Stringifies data for displaying it. If provided data is a `string` or a `number` it returns the same data.

#### API

`displayValue(data)`

* Arguments
	* data - `<Any>` Data to be formatted.

* Returns
	* <String> - Stringified data.

#### Usage

```jsx
import { displayValue } from "@domapic/ui-elements/helpers/formatters"

displayValue(true); // "true"
displayValue({foo:"foo"}) // "{"foo":"foo"}"
```
