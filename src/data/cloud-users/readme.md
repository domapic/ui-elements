## Cloud users data

> Mercury origins and selectors related with domapic-cloud users:

### Entities

#### Users

##### Origins

* cloudUserMe - `<Object>`  Details about currently logged user.
* cloudUserModels - `<Object>` Details about an specific user.

##### Selectors

* cloudUserMeWithExtraData - `<Object>` Details about currently logged user with extra data, such as user avatar url.
* cloudUserModelsWithExtraData - `<Object>` Details about an specific user with extra data, such as user avatar url.

#### Reset Password keys

##### Origins

* resetPasswordKeysCollection - `<Array>` Available reset password keys.
* resetPasswordKeysModels - `<Object>` Details about an specific reset password key.
* resetPasswordKeysConfirm - Confirms reset password action. Only `create` method should be used.

#### Registration keys

##### Origins

* registrationKeysCollection - `<Array>` Available registration keys.
* registrationKeysModels - `<Object>` Details about an specific registration key.
* registrationKeysConfirm - Confirms registration. Only `create` method should be used.
