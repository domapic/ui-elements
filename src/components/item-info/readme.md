## Item info component

> Displays entities information.

### Details

* Displays a simple table with two columns. First one for labels and second for values.

### Props

* data - `<Array of Objects>`
	* label - `<String>` Label.
	* value - `<String>` Value.

### Usage

```jsx
import ItemInfo from "@domapic/ui-elements/components/item-info";

export const Foo = () => (
  <ItemInfo data={[
    {
      label: "foo label",
      value: "foo value"
    },
    {
      label: "foo label 2",
      value: "foo value 2"
    }
  ]}/>
);
```
