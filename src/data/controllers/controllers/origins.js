import { Api } from "@xbyorange/mercury-api";

import { socket } from "data/socket";
import { getAuthConfig } from "helpers/api";

import { controllerModels } from "../controller/origins";

// CONTROLLERS COLLECTION

export const controllersCollection = new Api("/controllers", getAuthConfig([]));

controllersCollection.addCustomQuery({
  allowedUser: userId => {
    if (userId) {
      return {
        queryString: {
          "allowed-user": userId
        }
      };
    }
  }
});

socket.addListener(
  [
    "controller:created",
    "controller:deleted",
    "controller:updated",
    "controllerToken:created",
    "controllerToken:updated",
    "controllerToken:deleted"
  ],
  () => {
    controllersCollection.clean();
  }
);

controllerModels.onChangeAny(changeDetails => {
  if (
    [controllerModels.actions.delete.success, controllerModels.actions.update.success].includes(
      changeDetails.action
    )
  ) {
    controllersCollection.clean();
  }
});
