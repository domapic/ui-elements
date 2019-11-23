import { Api } from "@data-provider/axios";

export const gravatar = new Api("/avatar/:hash", {
  tags: ["gravatar"],
  fullResponse: true,
  validateStatus: () => true
});
