import { Selector } from "@xbyorange/mercury";

import { cloudUserMe } from "data/cloud-users";

import { controllersCollection } from "./origins";
import { controllerTokensOfUserMe } from "../controller-tokens/selectors";

export const controllersOfUserMe = new Selector(
  cloudUserMe,
  {
    source: controllersCollection,
    query: (query, previousResults) => {
      return controllersCollection.customQueries.allowedUser(previousResults[0]._id);
    }
  },
  (userMe, controllers) => controllers,
  []
);

export const controllersOfUserMeWithExtraData = new Selector(
  cloudUserMe,
  controllersOfUserMe,
  controllerTokensOfUserMe,
  (userMe, controllersOfUserMe, controllerTokensOfUserMe) => {
    return controllersOfUserMe.map(controller => {
      return {
        ...controller,
        userIsOwner: controller._user === userMe._id,
        userCanConnect: !!controllerTokensOfUserMe.find(
          controllerToken => controllerToken._controller === controller._id
        )
      };
    });
  },
  []
);
