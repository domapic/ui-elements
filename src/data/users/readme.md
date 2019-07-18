## Users data

> Data related to domapic controller users:

### Entities

#### Avatar

##### Origins

* gravatar - `<Object>` Http response of request to Gravatar providing a given user email.

##### Selectors

* userAvatar - `<Object>` Object with avatar property that contains the gravatar image url.

#### Me

##### Origins

* userMe - `<Object>` Details about current logged user. 

##### Selectors

* userMeWithExtraData - `<Object>` Details about current logged user with extra data such as avatar url, details about user role, etc.

* userMeIsAdmin - `<Boolean>` `true` if current logged user has an `admin` role.

#### Roles

##### Origins

* roles - `<Array>` Details about Domapic Controller roles.

##### Selectors

* nonSystemRoles - `<Array>` Details about Domapic Controller human users roles.

#### Users

##### Origins

* usersCollection - `<Array>` Domapic Controller users.

##### Selectors

* usersCollectionWithExtraData - `<Array>` Domapic Controller users with extra data, such as type of role.
* usersCollectionExactFiltered - `<Array>` Users filtered by exact match on email or name.
* usersCollectionFiltered - `<Array>` Users filtered by partial coincidence on email, name or role.
* usersCollectionFilteredAndSorted - `<Array>` Users filtered by partial coincidence and sorted.

##### Actions

* `isValidUserName(name)` Returns true if provided name is valid.
	* name - `<String>` User name
* `isValidUserEmail(email)` Returns true if provided email is valid.
	* email - `<String>` User email
* `isUserNameRepeated(name)` Returns true if user name already exists.
	* name - `<String>` User name
* `isUserEmailRepeated(email)` Returns true if user email already exists.
	* email - `<String>` User email
