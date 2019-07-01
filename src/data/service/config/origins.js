import { Api } from "@xbyorange/mercury-api";

export const config = new Api("/config", {
  tags: ["auth"],
  defaultValue: {}
});
