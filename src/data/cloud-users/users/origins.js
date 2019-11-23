import { Api } from "@data-provider/axios";

import { socket } from "data/socket";
import { byIdQuery, getAuthConfig } from "helpers/api";

export const cloudUserMe = new Api("/users/me", getAuthConfig({}));

export const cloudUserModels = new Api("/users/:id", getAuthConfig({}));

cloudUserModels.addCustomQuery({
  byId: byIdQuery
});

socket.addListener(["cloudUser:updated", "cloudUser:deleted"], eventData => {
  cloudUserModels.byId(eventData._id).clean();
  cloudUserMe.clean();
});
