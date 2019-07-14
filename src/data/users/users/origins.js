import { SelectedControllerBasedOrigin } from "data/controllers";

import { userModels } from "../user/origins";
import { userMe } from "../me/origins";

import { socket } from "data/socket";

export const usersCollection = SelectedControllerBasedOrigin(
  "/users",
  {
    defaultValue: []
  },
  (origin, controllerBasedOrigin) => {
    socket.addListener(["user:created", "user:updated", "user:deleted"], () => {
      origin.clean();
      controllerBasedOrigin.clean();
    });

    userModels.onChangeAny(changeDetails => {
      if (
        [userModels.actions.delete.success, userModels.actions.update.success].includes(
          changeDetails.action
        )
      ) {
        origin.clean();
        controllerBasedOrigin.clean();
        userMe.clean();
      }
    });
  }
);
