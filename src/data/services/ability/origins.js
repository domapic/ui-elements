import { SelectedControllerBasedOrigin } from "data/controllers";
import { byIdQuery } from "helpers/api";

import { socket } from "data/socket";

const cleanOrigins = (origin, controllerBasedOrigin, eventData) => {
  origin.query(byIdQuery(eventData._id)).clean();
  controllerBasedOrigin
    .queryAddingController({
      query: byIdQuery(eventData._id),
      controller: eventData._controller
    })
    .clean();
};

export const abilityModels = SelectedControllerBasedOrigin(
  "/abilities/:id",
  {
    defaultValue: {}
  },
  (origin, controllerBasedOrigin) => {
    socket.addListener(["ability:updated", "ability:deleted"], eventData => {
      cleanOrigins(origin, controllerBasedOrigin, eventData);
    });
  }
);

abilityModels.addCustomQuery({
  byId: byIdQuery
});

export const abilityStates = SelectedControllerBasedOrigin(
  "/abilities/:id/state",
  {
    defaultValue: {}
  },
  (origin, controllerBasedOrigin) => {
    socket.addListener("ability:event", eventData => {
      cleanOrigins(origin, controllerBasedOrigin, eventData);
    });
  }
);

abilityStates.addCustomQuery({
  byId: byIdQuery
});

export const abilityActions = SelectedControllerBasedOrigin("/abilities/:id/action", {
  defaultValue: {}
});

abilityActions.addCustomQuery({
  byId: byIdQuery
});
