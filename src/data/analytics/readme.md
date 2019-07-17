## Analytics data

> Mercury origins and actions related with web analytics:

### Entities

#### google

##### Origins

* googleAnalytics - `<Object>` Contains properties related with google Analytics configuration.

##### Actions

* `enableAnalytics(accountId)` Enable google analytics and set provided account id.
	* accountId - `<String>` Google analytics account id.
* `sendPage(pageUrl)` Send page url to google analytics gtag as `config`.
	* pageUrl - `<String>` Url to send. Fragments with length upper than 15 characters will be considered as ids, and removed before sending it.
* `sendLogin(method)` Send login event to google analytics.
	* method - `<String>` Login method used.
* `sendSignup()` Send "sign up" event to google analytics.
* `sendEvent(action, category)`
	* action - `<String>` Event action.
	* category - `<String>` Event category.
