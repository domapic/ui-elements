import { Api } from "@xbyorange/mercury-api";

export const currentFeature = new Api("/mocks/features/current");

export const features = new Api("/mocks/features", {
  defaultValue: []
});
