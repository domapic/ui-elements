import { Api } from "@xbyorange/mercury-api";

import { byKeyQuery } from "helpers/api";

export const registrationKeysCollection = new Api("/registration-keys");

export const registrationKeysModels = new Api("/registration-keys/:key");

registrationKeysModels.addCustomQuery({
  byKey: byKeyQuery
});

export const registrationKeysConfirm = new Api("/registration-keys/:key/confirm");

registrationKeysConfirm.addCustomQuery({
  byKey: byKeyQuery
});
