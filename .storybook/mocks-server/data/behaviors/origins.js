import { Api } from "@xbyorange/mercury-api";

export const currentBehavior = new Api("/mocks/features/current", {
  updateMethod: "put"
});

export const behaviors = new Api("/mocks/features", {
  defaultValue: []
});
