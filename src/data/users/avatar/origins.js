import { Api } from "@xbyorange/mercury-api";

export const gravatar = new Api("/avatar/:hash", {
  tags: ["gravatar"],
  fullResponse: true,
  validateStatus: () => true
});
