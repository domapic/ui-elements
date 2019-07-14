import { Selector } from "@xbyorange/mercury";

import { authSessionDetails, authSessionRemember, authSessionTemporal } from "./origins";

export const authSession = new Selector(
  {
    source: authSessionDetails,
    query: authSessionDetails.customQueries.rememberMe
  },
  (hasToRemember, authenticationType) => {
    return hasToRemember
      ? authSessionRemember.query(authenticationType)
      : authSessionTemporal.query(authenticationType);
  }
);

authSession.addCustomQuery({
  refreshToken: () => "refreshToken"
});

authSession.addCustomQuery({
  apiKey: () => "apiKey"
});
