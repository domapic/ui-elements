import { Selector } from "@xbyorange/mercury";

import { settings } from "./origins";

export const delay = new Selector(settings, settingsResult => parseInt(settingsResult.delay));
