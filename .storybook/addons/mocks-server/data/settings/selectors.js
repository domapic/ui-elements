import { Selector } from "@data-provider/core";

import { settings } from "./origins";

export const delay = new Selector(settings, settingsResult => parseInt(settingsResult.delay));
