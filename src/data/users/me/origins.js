import { SelectedControllerBasedOrigin } from "data/controllers";

export const userMe = SelectedControllerBasedOrigin("/users/me", {
  defaultValue: {}
});
