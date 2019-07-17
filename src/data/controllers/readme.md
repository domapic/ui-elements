## Controllers data

> Mercury actions, origins and selectors related with domapic controllers:

### Entities

#### Controllers

##### Origins

* controllersCollection - `<Array>` Domapic controllers collection.

##### Selectors

* controllersOfUserMe - `<Object>` Controllers to which logged user has permissions to view.
* controllersOfUserMeWithExtraData - `<Object>` Details about an specific controller, including details about if current user permissions on it.

#### Controller

##### Origins

* controllerModels - `<Object>` Details about an specific controller.
* controllerApiKey - Regenerate api key of an specific controller.
* selectedController - `<Object>` Id of current selected controller.

##### Selectors

* currentController - `<Object>` Details about of current selected controller.

##### Actions

* `setSelectedController(controllerId)` - Set current selected controller.
	* controllerId - `<String>` Controller id.

#### Controller tokens

##### Origins

* controllerTokensCollection - `<Array>` Collection of users controller tokens.

##### Selectors

* controllerTokensOfUserMe - `<Object>` Controller tokens of current logged user.

### Extra methods

* SelectedControllerBasedOrigin - `<function>` Given an api data origin, returns a dynamic selector that will add the current controller as url param to requests. If selected controller is no required and there is no one, the url will not be modified.

