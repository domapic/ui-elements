import { Api } from "@xbyorange/mercury-api";
import { Memory } from "@xbyorange/mercury-memory";

import { socket } from "data/socket";
import { byIdQuery, getAuthConfig } from "helpers/api";

// CONTROLLER MODELS

export const controllerModels = new Api("/controllers/:id", getAuthConfig({}));

controllerModels.addCustomQuery({
  byId: byIdQuery
});

export const controllerApiKey = new Api("/controllers/:id/api-key", getAuthConfig({}));

controllerApiKey.addCustomQuery({
  byId: byIdQuery
});

socket.addListener(["controller:updated", "controller:deleted"], eventData => {
  controllerModels.byId(eventData._id).clean();
});

export const selectedController = new Memory({
  required: false
});

selectedController.addCustomQuery({
  id: () => "id"
});

selectedController.addCustomQuery({
  isRequired: () => "required"
});
