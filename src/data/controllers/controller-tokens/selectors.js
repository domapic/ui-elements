import { Selector } from "@xbyorange/mercury";

import { cloudUserMe } from "data/cloud-users";

import { controllerTokensCollection } from "./origins";

export const controllerTokensOfUserMe = new Selector(
  cloudUserMe,
  {
    source: controllerTokensCollection,
    query: (query, previousResults) => {
      return controllerTokensCollection.customQueries.ofUser(previousResults[0]._id);
    }
  },
  (userMe, controllerTokens) => controllerTokens,
  []
);
