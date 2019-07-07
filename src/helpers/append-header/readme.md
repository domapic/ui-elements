## append-header helpers

> Helpers to append dependencies to html header tag

### appendStyleSheet

Appends a `<link rel="stylesheet" type="text/css" href=[url]/>` tag to the header.

#### API

`appendStyleSheet(url)`

* Arguments
	* url - `<String>` Url of the css file to be appended.

#### Usage

```jsx
import { appendStyleSheet } from "@nex/ui-elements/helpers/append-header"

appendStyleSheet("https://cdn.com/styles.css");

```
