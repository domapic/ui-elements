## Security data

> Security data contains Mercury origins and selectors related with authentication and session:

### Entities

#### Authentication

##### Origins

* authSessionDetails - `<Object>` Details about session authentication method.
* authSessionRemember - `<Object>` Persisted origin with authentication details.
* authSessionTemporal - `<Object>` Origin with authentication details that will not be persisted between browser sessions.
* authSessionStatus - `<Object>` Status of current user session.
* authJwt - Api resource to create an user json web token.
* authGoogle - Api resource to create an user json web token through google oauth.

##### Selectors

* authSession - `<Boolean>` Returns authentication session details.

##### Actions

* `cleanAllAuthSessions()` Clean persisted and non persisted authentication details.
* `doJwtLogin(userData)` Creates a JSON web token based on provided user data and performs the rest of actions needed to complete login.
* `doApiKeyLogin(apiKey)` Creates a "session" based on provided api key and performs the rest of actions needed to complete login.
* `doGoogleOauthLogin(data)` Creates a JSON web token based on provided google oauth data and performs the rest of actions needed to complete login.
* `updateRemember(hasToRemember)` Updates authSessionDetails origin detailing if user has to be remembered next time the page is visited or not.
	* hasToRemember - `<Boolean>` User has to be remembered the next time.
* `updateIsLoginIn()` Updates authSessionDetails origin detailing if user is in the login page or not.

### Extra methods

* session - Instance of `Session` class with methods for authenticating api requests, performing logout, etc.
