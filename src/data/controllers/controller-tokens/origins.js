import { Api } from "@data-provider/axios";

import { socket } from "data/socket";
import { getAuthConfig } from "helpers/api";

// CONTROLLERS COLLECTION

export const controllerTokensCollection = new Api("/controller-tokens", getAuthConfig([]));

controllerTokensCollection.addCustomQuery({
  ofUser: userId => {
    if (userId) {
      return {
        queryString: {
          user: userId
        }
      };
    }
  }
});

socket.addListener(["controllerToken:created", "controllerToken:deleted"], () => {
  controllerTokensCollection.clean();
});
