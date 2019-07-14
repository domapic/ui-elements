import { socket } from "data/socket";
import { selectedController } from "./origins";

export const setSelectedController = controllerId => {
  socket.currentController = controllerId;
  selectedController.id().update(controllerId);
};
