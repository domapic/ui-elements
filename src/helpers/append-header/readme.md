## append-header helpers

> Helpers to append dependencies to html header tag

### appendStyleSheet

Appends a `<link rel="stylesheet" type="text/css" href=[url]/>` tag to the header.

#### API

`appendStyleSheet(url[, options])`

* Arguments
	* url - `<String>` Url of the css file to be appended.
	* options - `<Object>`
		* method - `<String>` One of "append" or "prepend". Defineds where the link tag will be inserted. "append" by default.

#### Usage

```jsx
import { appendStyleSheet } from "@domapic/ui-elements/helpers/append-header"

appendStyleSheet("https://cdn.com/styles.css");
```
