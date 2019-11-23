import { Api } from "@data-provider/axios";

export const currentBehavior = new Api("/mocks/features/current", {
  updateMethod: "put"
});

export const behaviors = new Api("/mocks/features", {
  defaultValue: []
});
