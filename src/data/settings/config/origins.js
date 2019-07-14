import { SelectedControllerBasedOrigin } from "data/controllers";

export const config = SelectedControllerBasedOrigin("/config", {
  defaultValue: {}
});
