import { Api } from "@data-provider/axios";

export const settings = new Api("/mocks/settings", {
  updateMethod: "put"
});
