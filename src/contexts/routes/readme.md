## Routes context

> The routes context defines the routes of the application and provides helpers to build dynamic routes.

### API

* helpers - `<Object>`
	* getRoute - `<Function>` Function used to get dynamic routes. Should be able to receive two arguments: section name, and controller Id (for multi-controller applications)
* sections - `<Object>` Object containing details about application sections and layouts in which they should be rendered, as well as sections to be rendered in the application menu
	* menu - `<Object>` Sections to be displayed in the application menu.
	* sideBarLayout - `<Object>` Sections to be rendered using the sideBarLayout component.
	* simpleLayout - `<Object>` Sections to be rendered using the simpleLayout component.
	* sideBarLayoutRoutesMatcher - `<String>` Matcher for the Router that will match all sidebar layout sections.
* changeCurrentController - `<Function>` When dispatched, should update the `data/controllers` `selectedController` data origin, on which depends a lot of data selectors that will be automatically refreshed.
* The rest of the properties are `<Strings>` containing static routes to application sections.

### Usage

> this context should be used through the `components/with-routes` HOC of this project.
