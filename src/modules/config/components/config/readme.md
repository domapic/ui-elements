## Config component

> Displays configuration properties.

### Details

* Displays a simple table with two columns. First one for labels and second for values.
* If loading, display a loading spinner above the content.
* If receives an error, renders error component instead of config.

### Props

* title - `<String>`
* config - `<Array of Objects>`
	* label - `<String>` Label.
	* value - `<String>` Value.
* loading - `<Boolean>`
* error - `<Error>`

### Usage

The usage of this component is reserved to the config module.
