import { Api } from "@xbyorange/mercury-api";

export const settings = new Api("/mocks/settings", {
  updateMethod: "put"
});
