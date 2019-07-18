## Services data

> Data related to domapic plugins and accessories:

### Entities

#### Abilities

##### Origins

* abilitiesCollection - `<Array>` Abilities of a given accessory.
* abilityModels - `<Object>` Details of a given ability.
* abilityStates - `<Any>` State of a given ability.
* abilityActions - Action of a given ability.

##### Selectors

* abilitiesCollectionWithExtraData - `<Array>` Accessories abilities with extra data, such as accessory name, minimum and maximum values, etc.
* abilitiesCollectionFiltered - `<Array>` Abilities collection filtered by custom search parameters.
* abilitiesCollectionFilteredAndSorted - `<Array>` Abilities collection filtered by custom search parameters and sorted.
* abilityModelsWithExtraData - `<Object>` Details of a given ability with extra data, such as accessory name, minimum and maximum values, etc.
* abilityStatesLoaded - `<Boolean>` Returns true if the state of a given ability has been loaded successfully.

##### Actions

* `validateAbilityData(ability, value)` Returns `<String>` containing errors details, or `null` if value is valid.
	* ability - `<Object>` Ability data to be validated.
	* value - `<Any>` Value to validate.

#### Logs

##### Origins

* logs - `<Array>` Services events logs collection.
* countLogs - `<Number>` Number of logs.

##### Selectors

* logsPage - `<Array>` Paginated logs.
* logsPageLoaded - `<Boolean>` Returns true if a given logs page has been loaded.
* logsPageWithDetails - `<Array>` Paginated logs with extra data, such as formatted date and time, name of the accessory, name of the ability, etc.
* logsPageWithDetailsLoaded - `<Boolean>` Returns true if a given logs page with details has been loaded. 

#### Services

##### Origins

* servicesCollection - `<Array>` Domapic services (accessories or plugins).
* serviceModels - `<Object>` Data of a given Domapic service (accessory or plugin).

##### Selectors

* modulesCollection - `<Array>` Domapic accessories.
* pluginsCollection - `<Array>` Domapic plugins.
* modulesCollectionFiltered - `<Array>` Accessories filtered by name and description.
* pluginsCollectionFiltered - `<Array>` Plugins filtered by name and description.
* modulesCollectionFilteredAndSorted - `<Array>` Accessories filtered by name and description and sorted.
* pluginsCollectionFilteredAndSorted - `<Array>` Plugins filtered by name and description and sorted.
