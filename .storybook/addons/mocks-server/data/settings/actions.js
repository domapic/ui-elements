import { settings } from "./origins";

export const changeDelay = delay =>
  settings.update({
    delay
  });
