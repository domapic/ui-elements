import { throttle } from "lodash";

import { SelectedControllerBasedOrigin } from "data/controllers";
import { socket } from "data/socket";

const REFRESH_LOGS_MAX_INTERVAL = 5000;

const addSocketListener = (origin, controllerBasedOrigin) => {
  socket.addListener(
    "log:created",
    throttle(() => {
      origin.clean();
      controllerBasedOrigin.clean();
    }, REFRESH_LOGS_MAX_INTERVAL)
  );
};

export const logs = SelectedControllerBasedOrigin(
  "/logs",
  {
    defaultValue: []
  },
  addSocketListener
);

export const countLogs = SelectedControllerBasedOrigin(
  "/logs/stats",
  {
    defaultValue: {}
  },
  addSocketListener
);

countLogs.addCustomQuery({
  ofAbility: ability => ({
    queryString: {
      ability
    }
  })
});
