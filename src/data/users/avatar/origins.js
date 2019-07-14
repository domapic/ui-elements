import { Api } from "@xbyorange/mercury-api";

export const gravatar = new Api("https://www.gravatar.com/avatar/:hash", {
  fullResponse: true,
  validateStatus: () => true
});
