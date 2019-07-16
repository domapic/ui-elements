## Legal data

> Legal data contains Mercury origins and selectors related with legal entities:

### Entities

#### Cookies

##### Origins

* cookies - `<Object>` Contains properties related with cookies policy.

##### Selectors

* cookiesAreAccepted - `<Boolean>` Returns current value of "accepted" key of cookies origin.

##### Actions

* `acceptCookies()` Set `cookies.accepted` to `true`.
* `rejectCookies()` Set `cookies.accepted` to `false`.
* `toggleCookies([value])`
	* value - `<Boolean>` New value to set in `cookies.accepted`.
