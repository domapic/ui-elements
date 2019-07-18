## validators helpers

> Helpers to validate data.

### isISO8601

Check if date is valid ISO8601.

#### API

`isISO8601(date)`

* Arguments
	* date - `<String>` Date
* Returns
	* `<Boolean>` `true` if date is valid.

### isEmail

Checks if email is valid.

#### API

`isEmail(email)`

* Arguments
	* email - `<String>` Email
* Returns
	* `<Boolean>` `true` if email is valid.

### isIP

Checks if ip is valid.

#### API

`isIP(ip)`

* Arguments
	* ip - `<String>` IP
* Returns
	* `<Boolean>` `true` if ip is valid.

### matches

Checks if provided string matches with provided regular expression.

#### API

`matches(value, regexp)`

* Arguments
	* value - `<String>` Value to check
	* regexp - `<RegExp>` Regex to check the provided value.
* Returns
	* `<Boolean>` `true` if value matches with the provided regular expression.

### isURL

Checks if provided string is a valid url.

#### API

`isURL(url)`

* Arguments
	* url - `<String>` Url to check
* Returns
	* `<Boolean>` `true` if is valid url.

### isUserName

Checks if provided user name is valid.

#### API

`isUserName(name)`

* Arguments
	* name - `<String>` User name to check
* Returns
	* `<Boolean>` `true` if is valid user name.

### isPassword

Checks if provided password is valid.

#### API

`isPassword(password)`

* Arguments
	* password - `<String>` Password to check
* Returns
	* `<Boolean>` `true` if is valid password.

### controllerNameHasMinLength

Checks if provided controller name is valid.

#### API

`controllerNameHasMinLength(name)`

* Arguments
	* name - `<String>` Controller name to check.
* Returns
	* `<Boolean>` `true` if is valid controller name.
