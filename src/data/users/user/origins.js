import { SelectedControllerBasedOrigin } from "data/controllers";

import { socket } from "data/socket";
import { byIdQuery } from "helpers/api";

export const userModels = SelectedControllerBasedOrigin(
  "/users/:id",
  {
    defaultValue: {}
  },
  (origin, controllerBasedOrigin) => {
    socket.addListener(["user:updated", "user:deleted"], userData => {
      origin.query(byIdQuery(userData._id)).clean();
      controllerBasedOrigin.query(byIdQuery(userData._id)).clean();
    });
  }
);

userModels.addCustomQuery({
  byId: byIdQuery
});
