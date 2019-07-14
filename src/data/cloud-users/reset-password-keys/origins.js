import { Api } from "@xbyorange/mercury-api";

import { byKeyQuery } from "helpers/api";

export const resetPasswordKeysCollection = new Api("/reset-password-keys");

export const resetPasswordKeysModels = new Api("/reset-password-keys/:key");

resetPasswordKeysModels.addCustomQuery({
  byKey: byKeyQuery
});

export const resetPasswordKeysConfirm = new Api("/reset-password-keys/:key/confirm");

resetPasswordKeysConfirm.addCustomQuery({
  byKey: byKeyQuery
});
