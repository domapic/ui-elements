import { SelectedControllerBasedOrigin } from "data/controllers";

import { socket } from "data/socket";
import { byIdQuery } from "helpers/api";

// SERVICE MODELS

export const serviceModels = SelectedControllerBasedOrigin(
  "/services/:id",
  {
    defaultValue: {}
  },
  (origin, controllerBasedOrigin) => {
    socket.addListener(["service:updated", "service:deleted"], eventData => {
      origin.query(byIdQuery(eventData._id)).clean();
      controllerBasedOrigin
        .queryAddingController({
          query: byIdQuery(eventData._id),
          controller: eventData._controller
        })
        .clean();
    });
  }
);

serviceModels.addCustomQuery({
  byId: byIdQuery
});
