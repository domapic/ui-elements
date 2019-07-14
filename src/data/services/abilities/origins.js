import { SelectedControllerBasedOrigin } from "data/controllers";

import { socket } from "data/socket";

// ABILITIES COLLECTION

export const abilitiesCollection = SelectedControllerBasedOrigin(
  "/abilities",
  {
    defaultValue: []
  },
  (origin, controllerBasedOrigin) => {
    socket.addListener(["ability:created", "ability:deleted", "ability:updated"], () => {
      origin.clean();
      controllerBasedOrigin.clean();
    });
  }
);

abilitiesCollection.addCustomQuery({
  ofService: serviceId => {
    if (serviceId) {
      return {
        queryString: {
          service: serviceId
        }
      };
    }
  }
});
